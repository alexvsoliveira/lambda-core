"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsLambdaHandlerFactory = void 0;
/**
 * Factory especializado para handlers de Lambda que processam eventos SNS.
 * Encapsula toda a complexidade específica do SNS.
 */
class SnsLambdaHandlerFactory {
    static createHandler(handlerInstance) {
        return async (event) => {
            return await handlerInstance.execute(event);
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createHandlerFromClass(HandlerClass) {
        const handlerInstance = new HandlerClass();
        return this.createHandler(handlerInstance);
    }
}
exports.SnsLambdaHandlerFactory = SnsLambdaHandlerFactory;
