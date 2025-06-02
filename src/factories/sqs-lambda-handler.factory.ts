import { SQSEvent } from 'aws-lambda';
import { SqsLambdaHandler } from '../abstracts/sqs-lambda-handler.abstract';

/**
 * Factory especializado para handlers de Lambda que processam eventos SQS.
 * Encapsula toda a complexidade específica do SQS.
 */
export class SqsLambdaHandlerFactory {
  private static createHandler<TDto extends Object, TSuccessResponse, TErrorResponse>(
    handlerInstance: SqsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: SQSEvent) => Promise<TSuccessResponse | TErrorResponse> {
    return async (event: SQSEvent) => {
      return await handlerInstance.execute(event);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static createHandlerFromClass<TDto extends Object, TSuccessResponse = any, TErrorResponse = Error | string>(
    HandlerClass: new () => SqsLambdaHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: SQSEvent) => Promise<TSuccessResponse | TErrorResponse> {
    const handlerInstance = new HandlerClass();
    return this.createHandler(handlerInstance);
  }
}
