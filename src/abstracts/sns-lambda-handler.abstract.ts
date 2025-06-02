import { SNSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { SnsParsingStrategy } from '../strategies/sns-parsing.strategy';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';

export abstract class SnsLambdaHandler<
  TDto extends Object,
  TSuccessResponse,
  TErrorResponse,
> extends LambdaBaseLambdaHandler<SNSEvent, TDto, TSuccessResponse, TErrorResponse, TDto[]> {
  protected get parsingStrategy(): LambdaEventParsingStrategy<SNSEvent, TDto, TDto[]> {
    return new SnsParsingStrategy<TDto>();
  }
}
