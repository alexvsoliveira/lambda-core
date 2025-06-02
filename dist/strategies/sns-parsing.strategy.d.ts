import { SNSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
/**
 * Estratégia para parsing de eventos SNS
 */
export declare class SnsParsingStrategy<TDto> implements LambdaEventParsingStrategy<SNSEvent, TDto, TDto[]> {
    parseEventToDto(event: SNSEvent, dtoClass: new () => TDto): TDto[];
    canHandle(event: SNSEvent): event is SNSEvent;
}
