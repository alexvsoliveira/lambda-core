import { SQSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaDtoUtil } from '../utils/dto.util';

/**
 * Estratégia para parsing de eventos SQS
 */
export class SqsParsingStrategy<TDto> implements LambdaEventParsingStrategy<SQSEvent, TDto, TDto[]> {
  parseEventToDto(event: SQSEvent, dtoClass: new () => TDto): TDto[] {
    const dtos: TDto[] = [];

    for (const record of event.Records) {
      const sqsMessage = record.body;
      const messageData = JSON.parse(sqsMessage);

      const dto = LambdaDtoUtil.parseDataToDto(dtoClass, messageData) as TDto;
      dtos.push(dto);
    }

    return dtos;
  }

  canHandle(event: unknown): event is SQSEvent {
    return (
      typeof event === 'object' &&
      event !== null &&
      'Records' in event &&
      Array.isArray(event.Records) &&
      event.Records.length > 0 &&
      'body' in event.Records[0] &&
      'receiptHandle' in event.Records[0]
    );
  }
}
