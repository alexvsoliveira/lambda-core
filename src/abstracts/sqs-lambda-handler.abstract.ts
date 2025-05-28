import { SQSEvent } from 'aws-lambda';
import { BaseLambdaHandler } from './base-lambda-handler.abstract';

export abstract class SqsLambdaHandler<
  TDto,
  TResponse,
> extends BaseLambdaHandler<SQSEvent, void> {
  protected abstract dtoClass: new () => TDto;

  protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;

  async execute(event: SQSEvent): Promise<void> {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);
      // @ts-ignore
      const dto = Object.assign(new this.dtoClass(), body);
      await this.handleBusinessLogic(dto);
    }
  }
}
