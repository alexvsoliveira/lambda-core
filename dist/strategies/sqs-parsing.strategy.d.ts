import { SQSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
/**
 * Estratégia para parsing de eventos SQS
 */
export declare class SqsParsingStrategy<TDto> implements LambdaEventParsingStrategy<SQSEvent, TDto, TDto[]> {
    parseEventToDto(event: SQSEvent, dtoClass: new () => TDto): TDto[];
    canHandle(event: unknown): event is SQSEvent;
}
