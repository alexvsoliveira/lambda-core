import { ClassConstructor } from 'class-transformer';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
export declare abstract class LambdaBaseLambdaHandler<TEvent, TDto extends Object, TSuccessResponse, TErrorResponse, TParsingStrategyReturnType> {
    protected abstract get dtoClass(): ClassConstructor<TDto>;
    protected abstract get parsingStrategy(): LambdaEventParsingStrategy<TEvent, TDto, TParsingStrategyReturnType>;
    execute(event: TEvent): Promise<TSuccessResponse | TErrorResponse>;
    protected handleError(error: unknown, event: TEvent): TErrorResponse;
    protected abstract handleBusinessLogic(dto: TParsingStrategyReturnType): Promise<TSuccessResponse>;
    protected handleErrorResponse(error: unknown): TErrorResponse;
    protected handleErrorWithGlobal(error: unknown, event: TEvent): void;
    protected extractMetadata(_error: unknown, _event: TEvent): Record<string, unknown>;
    protected parseDto(event: TEvent): TParsingStrategyReturnType;
}
