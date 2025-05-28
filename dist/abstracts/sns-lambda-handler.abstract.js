"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsLambdaHandler = void 0;
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
class SnsLambdaHandler extends base_lambda_handler_abstract_1.BaseLambdaHandler {
    async execute(event) {
        for (const record of event.Records) {
            const message = JSON.parse(record.Sns.Message);
            // @ts-ignore
            const dto = Object.assign(new this.dtoClass(), message);
            // @ts-ignore
            await this.handleBusinessLogic(dto);
        }
    }
}
exports.SnsLambdaHandler = SnsLambdaHandler;
