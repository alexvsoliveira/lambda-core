import { SQSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { SqsParsingStrategy } from '../strategies/sqs-parsing.strategy';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';

export abstract class SqsLambdaHandler<
  TDto extends Object,
  TSuccessResponse,
  TErrorResponse,
> extends LambdaBaseLambdaHandler<SQSEvent, TDto, TSuccessResponse, TErrorResponse, TDto[]> {
  protected get parsingStrategy(): LambdaEventParsingStrategy<SQSEvent, TDto, TDto[]> {
    return new SqsParsingStrategy<TDto>();
  }
}
