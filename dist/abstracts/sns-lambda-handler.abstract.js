"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsLambdaHandler = void 0;
const sns_parsing_strategy_1 = require("../strategies/sns-parsing.strategy");
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
class SnsLambdaHandler extends base_lambda_handler_abstract_1.LambdaBaseLambdaHandler {
    get parsingStrategy() {
        return new sns_parsing_strategy_1.SnsParsingStrategy();
    }
}
exports.SnsLambdaHandler = SnsLambdaHandler;
