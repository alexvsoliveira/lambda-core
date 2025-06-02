import { SNSEvent } from 'aws-lambda';
import { SnsLambdaHandler } from '../abstracts/sns-lambda-handler.abstract';
/**
 * Factory especializado para handlers de Lambda que processam eventos SNS.
 * Encapsula toda a complexidade específica do SNS.
 */
export declare class SnsLambdaHandlerFactory {
    private static createHandler;
    static createHandlerFromClass<TDto extends Object, TSuccessResponse = any, TErrorResponse = Error | string>(HandlerClass: new () => SnsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>): (event: SNSEvent) => Promise<TSuccessResponse | TErrorResponse>;
}
