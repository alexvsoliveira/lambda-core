"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVERLESS_METADATA = void 0;
exports.Serverless = Serverless;
require("reflect-metadata");
exports.SERVERLESS_METADATA = 'serverless';
function Serverless(config) {
    return (target) => {
        // Converte a configuração simplificada para o formato interno
        const serverlessConfig = {
            function: {
                name: config.name,
                events: [
                    {
                        type: config.type,
                        properties: {
                            ...config.properties,
                            enabled: config.enabled
                        }
                    }
                ]
            }
        };
        // Adiciona resource se especificado
        if (config.resource) {
            serverlessConfig.resource = {
                name: config.name,
                type: config.resource,
                properties: config.properties
            };
        }
        Reflect.defineMetadata(exports.SERVERLESS_METADATA, serverlessConfig, target);
    };
}
