"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaHttpFieldValidationException = void 0;
const http_status_enum_1 = require("../enums/http-status.enum");
const http_exception_1 = require("./http.exception");
class LambdaHttpFieldValidationException extends http_exception_1.LambdaMainHttpException {
    constructor(errors) {
        super({
            message: errors,
            statusCode: http_status_enum_1.HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
        });
        this.errors = errors;
    }
}
exports.LambdaHttpFieldValidationException = LambdaHttpFieldValidationException;
