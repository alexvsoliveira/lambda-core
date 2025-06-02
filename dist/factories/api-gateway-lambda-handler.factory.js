"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaApiGatewayHandlerFactory = void 0;
class LambdaApiGatewayHandlerFactory {
    static createHandler(handlerInstance) {
        return async (event) => {
            return await handlerInstance.execute(event);
        };
    }
    static createHandlerFromClass(HandlerClass) {
        const handlerInstance = new HandlerClass();
        return this.createHandler(handlerInstance);
    }
}
exports.LambdaApiGatewayHandlerFactory = LambdaApiGatewayHandlerFactory;
