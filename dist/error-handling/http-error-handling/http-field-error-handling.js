"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaHttpFieldErrorHandling = void 0;
const class_validator_1 = require("class-validator");
const http_field_validation_exception_1 = require("../../exceptions/http-field-validation.exception");
const validation_util_1 = require("../../utils/validation.util");
class LambdaHttpFieldErrorHandling {
    static async validateAndThrowError(dto) {
        const errors = await (0, class_validator_1.validate)(dto, {
            validationError: {
                target: false,
                value: false,
            },
            enableDebugMessages: true,
        });
        if (errors.length === 0) {
            return;
        }
        const fieldErrors = validation_util_1.LambdaValidationUtil.getAllFieldErrors(errors);
        throw new http_field_validation_exception_1.LambdaHttpFieldValidationException(fieldErrors);
    }
}
exports.LambdaHttpFieldErrorHandling = LambdaHttpFieldErrorHandling;
