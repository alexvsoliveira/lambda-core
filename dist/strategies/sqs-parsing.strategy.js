"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsParsingStrategy = void 0;
function isSQSEvent(event) {
    return (event &&
        event.Records.every((r) => typeof r.body === 'string') &&
        Array.isArray(event.Records) &&
        true &&
        typeof event === 'object');
}
class SqsParsingStrategy {
    static parseMessages(event) {
        if (!isSQSEvent(event)) {
            throw new Error('Invalid event structure: not an SQSEvent');
        }
        const records = event.Records;
        return records.map((record) => {
            const rawBody = record.body;
            let parsed;
            try {
                parsed = JSON.parse(rawBody);
            }
            catch (err) {
                console.error('Error parsing SQS record body:', rawBody, err);
                throw new Error('Invalid JSON in SQS message body');
            }
            if (typeof parsed !== 'object' || parsed === null) {
                console.error('Parsed value is not a valid object:', parsed);
                throw new Error('Parsed SQS message is not an object');
            }
            return parsed;
        });
    }
}
exports.SqsParsingStrategy = SqsParsingStrategy;
