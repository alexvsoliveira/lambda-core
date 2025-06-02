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
exports.LambdaCoreWebpackPlugin = void 0;
const crypto = __importStar(require("crypto"));
const glob = __importStar(require("glob"));
const path = __importStar(require("path"));
// Imports das dependências webpack
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const ProvidedDependency = require('webpack/lib/dependencies/ProvidedDependency');
const { JAVASCRIPT_MODULE_TYPE_DYNAMIC, JAVASCRIPT_MODULE_TYPE_AUTO, JAVASCRIPT_MODULE_TYPE_ESM, } = require('webpack/lib/ModuleTypeConstants');
const PLUGIN_NAME = 'LambdaCoreWebpackPlugin';
/**
 * Plugin webpack para o Lambda Core que automaticamente
 * descobre e registra error handlers baseados em padrão de arquivo
 */
class LambdaCoreWebpackPlugin {
    /**
     * @param directoryPath Caminho do diretório para buscar arquivos .error-handler.ts
     */
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
        this.definitions = this.resolveDefinitions(directoryPath);
    }
    /**
     * Resolve caminhos de diretório para caminhos de arquivo reais
     * @param directoryPath Caminho do diretório para buscar
     * @returns Array de caminhos de arquivos encontrados
     */
    resolveDefinitions(directoryPath) {
        try {
            const pattern = path.join(directoryPath, '**/*.error-handler.ts').replace(/\\/g, '/');
            const files = glob.sync(pattern, { absolute: true });
            if (files.length === 0)
                return [];
            return files;
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(`LambdaCoreWebpackPlugin: Erro ao buscar arquivos em '${directoryPath}':`, error);
            return [];
        }
    }
    /**
     * Aplica o plugin ao compilador webpack
     * @param compiler Instância do compilador webpack
     */
    apply(compiler) {
        const files = this.definitions;
        if (files.length === 0) {
            // eslint-disable-next-line no-console
            console.warn(`LambdaCoreWebpackPlugin: Nenhum arquivo .error-handler.ts encontrado em '${this.directoryPath}'`);
            return;
        }
        const hash = crypto.createHash('sha256').update('GlobalErrorHandler').digest('hex').substring(0, 10);
        const name = `GlobalErrorHandler_${hash}`;
        const definitions = {
            [name]: files,
        };
        compiler.hooks.compilation.tap(PLUGIN_NAME, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (compilation, { normalModuleFactory }) => {
            compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());
            compilation.dependencyFactories.set(ProvidedDependency, normalModuleFactory);
            compilation.dependencyTemplates.set(ProvidedDependency, new ProvidedDependency.Template());
            /**
             * Handler para processar o parser JavaScript
             * @param parser Parser JavaScript do webpack
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const handler = (parser) => {
                parser.hooks.program.tap(PLUGIN_NAME, () => {
                    if (!parser.state.module._providedDependenciesAdded) {
                        parser.state.module._providedDependenciesAdded = new Set();
                    }
                    for (const definitionName of Object.keys(definitions)) {
                        if (parser.state.module._providedDependenciesAdded.has(definitionName)) {
                            continue;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const request = [].concat(definitions[definitionName]);
                        const nameIdentifier = definitionName.includes('.')
                            ? `__webpack_provided_${definitionName.replace(/\./g, '_dot_')}`
                            : definitionName;
                        const dep = new ProvidedDependency(request[0], nameIdentifier, request.slice(1), [0, 0]);
                        dep.loc = { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } };
                        parser.state.module.addDependency(dep);
                        parser.state.module._providedDependenciesAdded.add(definitionName);
                    }
                });
            };
            normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_AUTO).tap(PLUGIN_NAME, handler);
            normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_DYNAMIC).tap(PLUGIN_NAME, handler);
            normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_ESM).tap(PLUGIN_NAME, handler);
        });
    }
}
exports.LambdaCoreWebpackPlugin = LambdaCoreWebpackPlugin;
