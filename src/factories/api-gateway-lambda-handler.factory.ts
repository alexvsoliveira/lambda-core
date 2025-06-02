import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaApiGatewayHandler } from '../abstracts/api-gateway-lambda-handler.abstract';
import { LambdaHttpResponse } from '../interfaces/http-response.interface';

export class LambdaApiGatewayHandlerFactory {
  private static createHandler<TDto extends Object, TSuccessResponse, TErrorResponse>(
    handlerInstance: LambdaApiGatewayHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: APIGatewayProxyEvent) => Promise<TSuccessResponse | TErrorResponse> {
    return async (event: APIGatewayProxyEvent) => {
      return await handlerInstance.execute(event);
    };
  }

  public static createHandlerFromClass<
    TDto extends Object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TSuccessResponse = LambdaHttpResponse<any>,
    TErrorResponse = LambdaHttpResponse<string>,
  >(
    HandlerClass: new () => LambdaApiGatewayHandler<TDto, TSuccessResponse, TErrorResponse>,
  ): (event: APIGatewayProxyEvent) => Promise<TSuccessResponse | TErrorResponse> {
    const handlerInstance = new HandlerClass();
    return this.createHandler(handlerInstance);
  }
}
