import { ScheduledEvent } from 'aws-lambda';
import { BaseLambdaHandler } from './base-lambda-handler.abstract';

export abstract class ScheduledLambdaHandler extends BaseLambdaHandler<
  ScheduledEvent,
  void
> {
  abstract handle(event: ScheduledEvent): Promise<void>;

  async execute(event: ScheduledEvent): Promise<void> {
    try {
      await this.handle(event);
    } catch (error) {
      console.error('[ScheduledHandler] erro ao executar job:', error);
      throw error;
    }
  }
}
