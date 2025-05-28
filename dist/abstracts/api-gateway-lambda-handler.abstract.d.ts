import { BaseLambdaHandler } from './base-lambda-handler.abstract';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
export declare abstract class LambdaApiGatewayHandler<TDto, TResponse> extends BaseLambdaHandler<APIGatewayProxyEvent, APIGatewayProxyResult> {
    protected abstract dtoClass: new () => TDto;
    protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;
    protected getSuccessStatusCode(): number;
    protected handleError(error: unknown): APIGatewayProxyResult;
    execute(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
}
