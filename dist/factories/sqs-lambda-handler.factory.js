"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsLambdaHandlerFactory = void 0;
class SqsLambdaHandlerFactory {
    static createHandlerFromClass(HandlerClass) {
        const instance = new HandlerClass();
        return instance.execute.bind(instance);
    }
}
exports.SqsLambdaHandlerFactory = SqsLambdaHandlerFactory;
