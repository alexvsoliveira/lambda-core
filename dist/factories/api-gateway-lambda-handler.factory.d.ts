import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaApiGatewayHandler } from '../abstracts/api-gateway-lambda-handler.abstract';
import { LambdaHttpResponse } from '../interfaces/http-response.interface';
export declare class LambdaApiGatewayHandlerFactory {
    private static createHandler;
    static createHandlerFromClass<TDto extends Object, TSuccessResponse = LambdaHttpResponse<any>, TErrorResponse = LambdaHttpResponse<string>>(HandlerClass: new () => LambdaApiGatewayHandler<TDto, TSuccessResponse, TErrorResponse>): (event: APIGatewayProxyEvent) => Promise<TSuccessResponse | TErrorResponse>;
}
