import { SNSEvent } from 'aws-lambda';
import { BaseLambdaHandler } from './base-lambda-handler.abstract';
export declare abstract class SnsLambdaHandler<TDto, TResponse> extends BaseLambdaHandler<SNSEvent, void> {
    protected abstract dtoClass: new () => TDto;
    protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;
    execute(event: SNSEvent): Promise<void>;
}
