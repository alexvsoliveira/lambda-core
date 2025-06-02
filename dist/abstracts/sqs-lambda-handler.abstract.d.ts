import { SQSEvent } from 'aws-lambda';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';
export declare abstract class SqsLambdaHandler<TDto extends Object, TSuccessResponse, TErrorResponse> extends LambdaBaseLambdaHandler<SQSEvent, TDto, TSuccessResponse, TErrorResponse, TDto[]> {
    protected get parsingStrategy(): LambdaEventParsingStrategy<SQSEvent, TDto, TDto[]>;
}
