"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFieldValidationException = void 0;
const http_exception_1 = require("./http.exception");
class HttpFieldValidationException extends http_exception_1.HttpException {
    constructor(errors) {
        super('Validation Failed', 400, 'VALIDATION_ERROR', errors);
    }
}
exports.HttpFieldValidationException = HttpFieldValidationException;
