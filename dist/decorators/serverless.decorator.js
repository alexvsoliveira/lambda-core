"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVERLESS_METADATA = void 0;
exports.Serverless = Serverless;
require("reflect-metadata");
exports.SERVERLESS_METADATA = 'serverless';
function Serverless(config) {
    return (target) => {
        Reflect.defineMetadata(exports.SERVERLESS_METADATA, config, target);
    };
}
