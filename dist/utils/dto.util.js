"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaDtoUtil = void 0;
const class_transformer_1 = require("class-transformer");
class LambdaDtoUtil {
    static parseDataToDto(cls, plain) {
        return (0, class_transformer_1.plainToInstance)(cls, plain, {
            enableImplicitConversion: true,
            enableCircularCheck: true,
        });
    }
    static fromAPIGatewayProxyEvent(cls, event) {
        return LambdaDtoUtil.parseDataToDto(cls, JSON.parse(event.body));
    }
}
exports.LambdaDtoUtil = LambdaDtoUtil;
