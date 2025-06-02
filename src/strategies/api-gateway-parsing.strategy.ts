import { APIGatewayProxyEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaDtoUtil } from '../utils/dto.util';

/**
 * Estratégia para parsing de eventos da API Gateway
 */
export class LambdaApiGatewayParsingStrategy<TDto>
  implements LambdaEventParsingStrategy<APIGatewayProxyEvent, TDto, TDto>
{
  parseEventToDto(event: APIGatewayProxyEvent, dtoClass: new () => TDto): TDto {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return LambdaDtoUtil.fromAPIGatewayProxyEvent(dtoClass as any, event);
  }

  canHandle(event: unknown): event is APIGatewayProxyEvent {
    return (
      typeof event === 'object' && event !== null && 'httpMethod' in event && 'headers' in event && 'body' in event
    );
  }
}
