"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledLambdaHandlerFactory = void 0;
/**
 * Factory for creating scheduled Lambda handlers
 */
class ScheduledLambdaHandlerFactory {
    /**
     * Creates a Lambda handler function for scheduled events
     * @param handlerClass The concrete handler class
     */
    static create(handlerClass) {
        return async (event, context) => {
            const handler = new handlerClass();
            await handler.execute(event);
        };
    }
}
exports.ScheduledLambdaHandlerFactory = ScheduledLambdaHandlerFactory;
