"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsParsingStrategy = void 0;
const dto_util_1 = require("../utils/dto.util");
/**
 * Estratégia para parsing de eventos SQS
 */
class SqsParsingStrategy {
    parseEventToDto(event, dtoClass) {
        const dtos = [];
        for (const record of event.Records) {
            const sqsMessage = record.body;
            const messageData = JSON.parse(sqsMessage);
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
            'body' in event.Records[0] &&
            'receiptHandle' in event.Records[0]);
    }
}
exports.SqsParsingStrategy = SqsParsingStrategy;
