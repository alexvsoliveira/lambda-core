"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsLambdaHandler = void 0;
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
class SqsLambdaHandler extends base_lambda_handler_abstract_1.BaseLambdaHandler {
    async execute(event) {
        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            // @ts-ignore
            const dto = Object.assign(new this.dtoClass(), body);
            await this.handleBusinessLogic(dto);
        }
    }
}
exports.SqsLambdaHandler = SqsLambdaHandler;
