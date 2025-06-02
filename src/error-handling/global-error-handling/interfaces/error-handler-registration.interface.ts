import { LambdaBaseLambdaHandler } from '../../../abstracts/base-lambda-handler.abstract';
import { GlobalErrorHandler } from './global-error-handler.interface';

/**
 * Interface para configuração de registro de error handlers
 *
 * Define quais tipos de erro e handlers este error handler pode tratar.
 */
export interface ErrorHandlerRegistration {
  /** Tipos de erro que este handler pode tratar (opcional - sem tipos = todos os erros) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly errorTypes?: (abstract new (...args: any[]) => Error)[];

  /** Tipos de handler onde este error handler se aplica (opcional - sem tipos = todos os handlers) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly handlerTypes?: (abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>)[];

  /** Se este handler está habilitado (padrão: true) */
  readonly enabled?: boolean;
}

export interface ErrorHandlerRegistry {
  config: ErrorHandlerRegistration;
  handler: GlobalErrorHandler;
}
