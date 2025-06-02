import { Handler, ScheduledEvent } from 'aws-lambda';
import { ScheduledLambdaHandler } from '../abstracts/scheduled-lambda-handler.abstract';
/**
 * Factory for creating scheduled Lambda handlers
 */
export declare class ScheduledLambdaHandlerFactory {
    /**
     * Creates a Lambda handler function for scheduled events
     * @param handlerClass The concrete handler class
     */
    static create(handlerClass: new () => ScheduledLambdaHandler): Handler<ScheduledEvent, void>;
}
