export interface LambdaHttpExceptionData<T = unknown> {
    message: T;
    statusCode: number;
    timestamp?: string;
}
