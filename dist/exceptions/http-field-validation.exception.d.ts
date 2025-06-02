import { LambdaValidationFieldErrors } from '../types/validation.type';
import { LambdaMainHttpException } from './http.exception';
export declare class LambdaHttpFieldValidationException extends LambdaMainHttpException {
    errors: LambdaValidationFieldErrors;
    constructor(errors: LambdaValidationFieldErrors);
}
