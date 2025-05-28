import { ScheduledEvent } from 'aws-lambda';
import { BaseLambdaHandler } from './base-lambda-handler.abstract';
export declare abstract class ScheduledLambdaHandler extends BaseLambdaHandler<ScheduledEvent, void> {
    abstract handle(event: ScheduledEvent): Promise<void>;
    execute(event: ScheduledEvent): Promise<void>;
}
