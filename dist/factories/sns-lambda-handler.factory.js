"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsLambdaHandlerFactory = void 0;
class SnsLambdaHandlerFactory {
    static createHandlerFromClass(HandlerClass) {
        const instance = new HandlerClass();
        return instance.execute.bind(instance);
    }
}
exports.SnsLambdaHandlerFactory = SnsLambdaHandlerFactory;
