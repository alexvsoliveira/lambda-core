"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessConfigGenerator = void 0;
const serverless_decorator_1 = require("../decorators/serverless.decorator");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ServerlessConfigGenerator {
    static getFilesRecursively(dir) {
        const files = [];
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                files.push(...this.getFilesRecursively(fullPath));
            }
            else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
                files.push(fullPath);
            }
        }
        return files;
    }
    static generateConfig(srcPath) {
        const files = this.getFilesRecursively(srcPath);
        const resources = {};
        const functions = {};
        for (const file of files) {
            try {
                const module = require(file);
                for (const key in module) {
                    const item = module[key];
                    if (typeof item === 'function') {
                        const metadata = Reflect.getMetadata(serverless_decorator_1.SERVERLESS_METADATA, item);
                        if (metadata) {
                            if (metadata.resource) {
                                const { name, type, properties } = metadata.resource;
                                resources[name] = {
                                    Type: `AWS::${type}::Topic`,
                                    Properties: properties,
                                };
                            }
                            if (metadata.function) {
                                const { name, events } = metadata.function;
                                const relativePath = file
                                    .replace(process.cwd(), '') // remove o root do projeto
                                    .replace(/^\/?src\//, 'src/') // força início com src/
                                    .replace(/\.ts$|\.js$/, '') // remove extensão
                                    .replace(/\\/g, '/'); // Windows compatível
                                functions[name] = {
                                    handler: `${relativePath}.handler`,
                                    events: events === null || events === void 0 ? void 0 : events.map((event) => ({
                                        [event.type]: event.properties,
                                    })),
                                };
                            }
                        }
                    }
                }
            }
            catch (error) {
                console.error(`Error processing file ${file}:`, error);
            }
        }
        return { resources: { Resources: resources }, functions };
    }
}
exports.ServerlessConfigGenerator = ServerlessConfigGenerator;
