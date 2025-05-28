"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledLambdaHandler = void 0;
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
class ScheduledLambdaHandler extends base_lambda_handler_abstract_1.BaseLambdaHandler {
    async execute(event) {
        try {
            await this.handle(event);
        }
        catch (error) {
            console.error('[ScheduledHandler] erro ao executar job:', error);
            throw error;
        }
    }
}
exports.ScheduledLambdaHandler = ScheduledLambdaHandler;
