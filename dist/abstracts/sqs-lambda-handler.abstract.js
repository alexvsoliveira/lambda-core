"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsLambdaHandler = void 0;
const sqs_parsing_strategy_1 = require("../strategies/sqs-parsing.strategy");
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
class SqsLambdaHandler extends base_lambda_handler_abstract_1.LambdaBaseLambdaHandler {
    get parsingStrategy() {
        return new sqs_parsing_strategy_1.SqsParsingStrategy();
    }
}
exports.SqsLambdaHandler = SqsLambdaHandler;
