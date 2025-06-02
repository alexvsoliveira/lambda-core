"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsParsingStrategy = void 0;
const dto_util_1 = require("../utils/dto.util");
/**
 * Estratégia para parsing de eventos SNS
 */
class SnsParsingStrategy {
    parseEventToDto(event, dtoClass) {
        const dtos = [];
        for (const record of event.Records) {
            const snsMessage = record.Sns.Message;
            const messageData = JSON.parse(snsMessage);
            const dto = dto_util_1.LambdaDtoUtil.parseDataToDto(dtoClass, messageData);
            dtos.push(dto);
        }
        return dtos;
    }
    canHandle(event) {
        return (typeof event === 'object' &&
            event !== null &&
            'Records' in event &&
            Array.isArray(event.Records) &&
            event.Records.length > 0 &&
            'Sns' in event.Records[0]);
    }
}
exports.SnsParsingStrategy = SnsParsingStrategy;
