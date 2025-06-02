import { SNSEvent } from 'aws-lambda';
import { SnsLambdaHandler } from '../abstracts/sns-lambda-handler.abstract';

/**
 * Factory especializado para handlers de Lambda que processam eventos SNS.
 * Encapsula toda a complexidade específica do SNS.
 */
export class SnsLambdaHandlerFactory {
  private static createHandler<TDto extends Object, TSuccessResponse, TErrorResponse>(
    handlerInstance: SnsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: SNSEvent) => Promise<TSuccessResponse | TErrorResponse> {
    return async (event: SNSEvent) => {
      return await handlerInstance.execute(event);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static createHandlerFromClass<TDto extends Object, TSuccessResponse = any, TErrorResponse = Error | string>(
    HandlerClass: new () => SnsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: SNSEvent) => Promise<TSuccessResponse | TErrorResponse> {
    const handlerInstance = new HandlerClass();
    return this.createHandler(handlerInstance);
  }
}
