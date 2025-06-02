"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaApiGatewayParsingStrategy = void 0;
const dto_util_1 = require("../utils/dto.util");
/**
 * Estratégia para parsing de eventos da API Gateway
 */
class LambdaApiGatewayParsingStrategy {
    parseEventToDto(event, dtoClass) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return dto_util_1.LambdaDtoUtil.fromAPIGatewayProxyEvent(dtoClass, event);
    }
    canHandle(event) {
        return (typeof event === 'object' && event !== null && 'httpMethod' in event && 'headers' in event && 'body' in event);
    }
}
exports.LambdaApiGatewayParsingStrategy = LambdaApiGatewayParsingStrategy;
