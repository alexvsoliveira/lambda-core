"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsParsingStrategy = void 0;
class SnsParsingStrategy {
    static parseMessages(event) {
        return event.Records.map((record) => {
            return JSON.parse(record.Sns.Message);
        });
    }
}
exports.SnsParsingStrategy = SnsParsingStrategy;
