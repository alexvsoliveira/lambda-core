import { LambdaHttpExceptionData } from '../interfaces/exception.interface';
export declare abstract class LambdaMainHttpException extends Error {
    exception: LambdaHttpExceptionData;
    readonly response: LambdaHttpExceptionData;
    readonly status: number;
    constructor(exception: LambdaHttpExceptionData);
    private createErrorMessage;
    toString(): string;
}
