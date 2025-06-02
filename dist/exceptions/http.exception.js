"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaMainHttpException = void 0;
class LambdaMainHttpException extends Error {
    constructor(exception) {
        super();
        this.exception = exception;
        this.message = this.createErrorMessage(exception.message);
        this.response = exception;
        this.status = exception.statusCode;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
    createErrorMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        if (typeof message === 'object' && message !== null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const messageObj = message;
            if ('message' in messageObj && typeof messageObj.message === 'string') {
                return messageObj.message;
            }
            return JSON.stringify(message);
        }
        return String(message);
    }
    toString() {
        return JSON.stringify({
            statusCode: this.status,
            message: this.response.message,
            timestamp: this.response.timestamp || new Date().toISOString(),
        });
    }
}
exports.LambdaMainHttpException = LambdaMainHttpException;
