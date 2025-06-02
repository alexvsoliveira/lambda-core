import { ClassConstructor } from 'class-transformer';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';

// Importações para Global Error Handler
import { ErrorContext } from '../error-handling/global-error-handling/interfaces/error-context.interface';
import { GlobalErrorHandlerRegistry } from '../error-handling/global-error-handling/registry/global-error-handler-registry';

export abstract class LambdaBaseLambdaHandler<
  TEvent,
  TDto extends Object,
  TSuccessResponse,
  TErrorResponse,
  TParsingStrategyReturnType,
> {
  protected abstract get dtoClass(): ClassConstructor<TDto>;

  protected abstract get parsingStrategy(): LambdaEventParsingStrategy<TEvent, TDto, TParsingStrategyReturnType>;

  public async execute(event: TEvent): Promise<TSuccessResponse | TErrorResponse> {
    try {
      const dto = this.parseDto(event);

      return await this.handleBusinessLogic(dto);
    } catch (error) {
      return this.handleError(error, event);
    }
  }

  protected handleError(error: unknown, event: TEvent): TErrorResponse {
    this.handleErrorWithGlobal(error, event);

    return this.handleErrorResponse(error);
  }

  protected abstract handleBusinessLogic(dto: TParsingStrategyReturnType): Promise<TSuccessResponse>;

  protected handleErrorResponse(error: unknown): TErrorResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return error as any;
  }

  protected handleErrorWithGlobal(error: unknown, event: TEvent): void {
    const context: ErrorContext = {
      originalEvent: event,
      handlerName: this.constructor.name,
      timestamp: new Date(),
      metadata: this.extractMetadata(error, event),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalHandlers = GlobalErrorHandlerRegistry.getInstance().getHandler(error, this.constructor as any);

    if (globalHandlers) {
      for (const globalHandler of globalHandlers) {
        globalHandler.handle(error as Error, context);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected extractMetadata(_error: unknown, _event: TEvent): Record<string, unknown> {
    return {};
  }

  protected parseDto(event: TEvent): TParsingStrategyReturnType {
    if (!this.parsingStrategy.canHandle(event)) {
      throw new Error('Event type not supported by the parsing strategy');
    }

    return this.parsingStrategy.parseEventToDto(event, this.dtoClass);
  }
}
