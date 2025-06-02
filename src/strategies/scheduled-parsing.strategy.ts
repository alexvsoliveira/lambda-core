import { ScheduledEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';

/**
 * Strategy for parsing scheduled Lambda events (CloudWatch Events/EventBridge)
 */
export class ScheduledParsingStrategy implements LambdaEventParsingStrategy<ScheduledEvent, Record<string, unknown>, ScheduledEvent> {
  parseEventToDto(event: ScheduledEvent): ScheduledEvent {
    // For scheduled events, we just pass through the event as is
    return event;
  }

  canHandle(event: unknown): event is ScheduledEvent {
    return (
      typeof event === 'object' &&
      event !== null &&
      'detail-type' in event &&
      'source' in event &&
      'time' in event
    );
  }
} 