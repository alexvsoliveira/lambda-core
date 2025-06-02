import { ScheduledEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
/**
 * Strategy for parsing scheduled Lambda events (CloudWatch Events/EventBridge)
 */
export declare class ScheduledParsingStrategy implements LambdaEventParsingStrategy<ScheduledEvent, Record<string, unknown>, ScheduledEvent> {
    parseEventToDto(event: ScheduledEvent): ScheduledEvent;
    canHandle(event: unknown): event is ScheduledEvent;
}
