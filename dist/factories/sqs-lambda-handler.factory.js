"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsLambdaHandlerFactory = void 0;
/**
 * Factory especializado para handlers de Lambda que processam eventos SQS.
 * Encapsula toda a complexidade específica do SQS.
 */
class SqsLambdaHandlerFactory {
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
exports.SqsLambdaHandlerFactory = SqsLambdaHandlerFactory;
