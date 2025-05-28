"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaApiGatewayHandler = void 0;
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lambda_error_filter_1 = require("../filters/lambda-error.filter");
class LambdaApiGatewayHandler extends base_lambda_handler_abstract_1.BaseLambdaHandler {
    getSuccessStatusCode() {
        return 200;
    }
    handleError(error) {
        return lambda_error_filter_1.LambdaErrorFilter.handle(error);
    }
    async execute(event) {
        var _a;
        try {
            let parsed;
            try {
                parsed = JSON.parse((_a = event === null || event === void 0 ? void 0 : event.body) !== null && _a !== void 0 ? _a : '{}');
            }
            catch (err) {
                console.error('Failed to parse request body:', err);
                throw new Error('Invalid JSON');
            }
            if (typeof parsed !== 'object' || parsed === null) {
                throw new Error('Parsed body is not a valid object');
            }
            const rawBody = parsed;
            const dto = (0, class_transformer_1.plainToInstance)(this.dtoClass, rawBody);
            // @ts-ignore
            const errors = await (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: true,
                        message: 'Validation failed',
                        details: errors,
                    }),
                };
            }
            const result = await this.handleBusinessLogic(dto);
            return {
                statusCode: this.getSuccessStatusCode(),
                body: JSON.stringify(result),
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.LambdaApiGatewayHandler = LambdaApiGatewayHandler;
