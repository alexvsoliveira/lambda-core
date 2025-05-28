"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaErrorFilter = void 0;
class LambdaErrorFilter {
    static handle(error) {
        if (error instanceof Error) {
            console.error('[ERROR]', error.message, error.stack);
        }
        else {
            console.error('[ERROR - Unknown]', JSON.stringify(error));
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: true,
                message: 'Internal server error',
            }),
        };
    }
    static handleWithMessage(message, error) {
        if (error instanceof Error) {
            console.error(`[${message}]`, error.message, error.stack);
        }
        else {
            console.error(`[${message} - Unknown]`, JSON.stringify(error));
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: true,
                message,
            }),
        };
    }
}
exports.LambdaErrorFilter = LambdaErrorFilter;
