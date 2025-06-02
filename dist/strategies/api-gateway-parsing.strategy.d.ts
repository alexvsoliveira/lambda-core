import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
/**
 * Estratégia para parsing de eventos da API Gateway
 */
export declare class LambdaApiGatewayParsingStrategy<TDto> implements LambdaEventParsingStrategy<APIGatewayProxyEvent, TDto, TDto> {
    parseEventToDto(event: APIGatewayProxyEvent, dtoClass: new () => TDto): TDto;
    canHandle(event: unknown): event is APIGatewayProxyEvent;
}
