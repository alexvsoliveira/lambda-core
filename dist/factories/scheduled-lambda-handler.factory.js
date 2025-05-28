"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledLambdaHandlerFactory = void 0;
class ScheduledLambdaHandlerFactory {
    static createHandlerFromClass(HandlerClass) {
        const instance = new HandlerClass();
        return instance.execute.bind(instance);
    }
}
exports.ScheduledLambdaHandlerFactory = ScheduledLambdaHandlerFactory;
