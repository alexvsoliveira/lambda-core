import {SNSEvent, SNSMessage} from 'aws-lambda';
import {BaseLambdaHandler} from './base-lambda-handler.abstract';

export abstract class SnsLambdaHandler<
    TDto,
    TResponse,
> extends BaseLambdaHandler<SNSEvent, void> {
    protected abstract dtoClass: new () => TDto;

    protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;

    async execute(event: SNSEvent): Promise<void> {
        for (const record of event.Records) {
            const message: SNSMessage = JSON.parse(record.Sns.Message);
            // @ts-ignore
            const dto: TDto = Object.assign(new this.dtoClass(), message);
            // @ts-ignore
            await this.handleBusinessLogic(dto);
        }
    }
}
