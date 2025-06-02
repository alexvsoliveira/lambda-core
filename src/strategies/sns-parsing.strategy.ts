import { SNSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaDtoUtil } from '../utils/dto.util';

/**
 * Estratégia para parsing de eventos SNS
 */
export class SnsParsingStrategy<TDto> implements LambdaEventParsingStrategy<SNSEvent, TDto, TDto[]> {
  parseEventToDto(event: SNSEvent, dtoClass: new () => TDto): TDto[] {
    const dtos: TDto[] = [];

    for (const record of event.Records) {
      const snsMessage = record.Sns.Message;
      const messageData = JSON.parse(snsMessage);

      const dto = LambdaDtoUtil.parseDataToDto(dtoClass, messageData) as TDto;
      dtos.push(dto);
    }

    return dtos;
  }

  canHandle(event: SNSEvent): event is SNSEvent {
    return (
      typeof event === 'object' &&
      event !== null &&
      'Records' in event &&
      Array.isArray(event.Records) &&
      event.Records.length > 0 &&
      'Sns' in event.Records[0]
    );
  }
}
