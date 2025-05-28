import { SQSEvent } from 'aws-lambda';
import { BaseLambdaHandler } from './base-lambda-handler.abstract';
export declare abstract class SqsLambdaHandler<TDto, TResponse> extends BaseLambdaHandler<SQSEvent, void> {
    protected abstract dtoClass: new () => TDto;
    protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;
    execute(event: SQSEvent): Promise<void>;
}
