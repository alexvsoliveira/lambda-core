import { APIGatewayEvent } from 'aws-lambda';
import { LambdaHttpResponse } from '../interfaces/http-response.interface';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';
import { HttpStatus } from '../enums/http-status.enum';
export declare abstract class LambdaApiGatewayHandler<TDto extends Object, TSuccessResponse = LambdaHttpResponse<string>, TErrorResponse = LambdaHttpResponse<string>> extends LambdaBaseLambdaHandler<APIGatewayEvent, TDto, TSuccessResponse, TErrorResponse, TDto> {
    protected get parsingStrategy(): LambdaEventParsingStrategy<APIGatewayEvent, TDto, TDto>;
    execute(event: APIGatewayEvent): Promise<TSuccessResponse | TErrorResponse>;
    protected handleErrorResponse(error: unknown): TErrorResponse;
    protected getSuccessStatusCode(): HttpStatus;
    private convertToApiGatewayResponse;
    private isHttpResponse;
    protected extractMetadata(_error: unknown, event: APIGatewayEvent): Record<string, unknown>;
}
