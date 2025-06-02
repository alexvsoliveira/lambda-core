import { SNSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';
export declare abstract class SnsLambdaHandler<TDto extends Object, TSuccessResponse, TErrorResponse> extends LambdaBaseLambdaHandler<SNSEvent, TDto, TSuccessResponse, TErrorResponse, TDto[]> {
    protected get parsingStrategy(): LambdaEventParsingStrategy<SNSEvent, TDto, TDto[]>;
}
