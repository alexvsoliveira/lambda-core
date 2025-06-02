import { Context, ScheduledEvent } from 'aws-lambda';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';
import { ClassConstructor } from 'class-transformer';
import { ScheduledParsingStrategy } from '../strategies/scheduled-parsing.strategy';

/**
 * Abstract class for handling scheduled Lambda events (CloudWatch Events/EventBridge)
 */
export abstract class ScheduledLambdaHandler extends LambdaBaseLambdaHandler<
  ScheduledEvent,
  Record<string, unknown>,
  void,
  Error,
  ScheduledEvent
> {
  protected get dtoClass(): ClassConstructor<Record<string, unknown>> {
    return Object as unknown as ClassConstructor<Record<string, unknown>>;
  }

  protected get parsingStrategy(): ScheduledParsingStrategy {
    return new ScheduledParsingStrategy();
  }

  /**
   * Template method to be implemented by concrete handlers
   * @param event The parsed CloudWatch/EventBridge event
   * @param context The Lambda context
   */
  protected abstract process(event: ScheduledEvent, context: Context): Promise<void>;

  protected async handleBusinessLogic(event: ScheduledEvent): Promise<void> {
    return this.process(event, {} as Context);
  }
} 