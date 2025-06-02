import { SQSEvent } from 'aws-lambda';
import { SqsLambdaHandler } from '../abstracts/sqs-lambda-handler.abstract';
/**
 * Factory especializado para handlers de Lambda que processam eventos SQS.
 * Encapsula toda a complexidade específica do SQS.
 */
export declare class SqsLambdaHandlerFactory {
    private static createHandler;
    static createHandlerFromClass<TDto extends Object, TSuccessResponse = any, TErrorResponse = Error | string>(HandlerClass: new () => SqsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>): (event: SQSEvent) => Promise<TSuccessResponse | TErrorResponse>;
}
