"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaApiGatewayHandlerFactory = void 0;
class LambdaApiGatewayHandlerFactory {
    static createHandlerFromClass(HandlerClass) {
        const instance = new HandlerClass();
        return instance.execute.bind(instance);
    }
}
exports.LambdaApiGatewayHandlerFactory = LambdaApiGatewayHandlerFactory;
