"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaValidationUtil = void 0;
class LambdaValidationUtil {
    static getAllFieldErrors(validationErrors, fieldErrors = {}) {
        validationErrors.forEach((error) => {
            const fieldName = error.property;
            fieldErrors[fieldName] = [];
            // Esse campo possui mensagens de erro a serem exibidas?
            if (error.constraints) {
                fieldErrors[fieldName] = Object.values(error.constraints);
            }
            // Esse campo possui outros campos aninhados a serem validados?
            if (error.children && error.children.length > 0) {
                fieldErrors[fieldName] = this.getAllFieldErrors(error.children);
            }
        });
        return fieldErrors;
    }
}
exports.LambdaValidationUtil = LambdaValidationUtil;
