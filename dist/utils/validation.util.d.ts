import { ValidationError } from 'class-validator';
import { LambdaValidationFieldErrors } from '../types/validation.type';
export declare class LambdaValidationUtil {
    static getAllFieldErrors(validationErrors: ValidationError[], fieldErrors?: LambdaValidationFieldErrors): LambdaValidationFieldErrors;
}
