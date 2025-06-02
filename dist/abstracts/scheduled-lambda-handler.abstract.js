"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledLambdaHandler = void 0;
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
const scheduled_parsing_strategy_1 = require("../strategies/scheduled-parsing.strategy");
/**
 * Abstract class for handling scheduled Lambda events (CloudWatch Events/EventBridge)
 */
class ScheduledLambdaHandler extends base_lambda_handler_abstract_1.LambdaBaseLambdaHandler {
    get dtoClass() {
        return Object;
    }
    get parsingStrategy() {
        return new scheduled_parsing_strategy_1.ScheduledParsingStrategy();
    }
    async handleBusinessLogic(event) {
        return this.process(event, {});
    }
}
exports.ScheduledLambdaHandler = ScheduledLambdaHandler;
