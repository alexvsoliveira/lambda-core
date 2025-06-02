import { LambdaBaseLambdaHandler } from '../../../abstracts/base-lambda-handler.abstract';

/**
 * Interface para configuração do decorator @ErrorHandler()
 */
export interface ErrorHandlerConfig {
  /** Tipos de erro que este handler pode tratar (opcional - sem tipos = todos os erros) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly errorTypes?: (abstract new (...args: any[]) => Error)[];

  /** Tipos de handler onde este error handler se aplica (opcional - sem tipos = todos os handlers) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly handlerTypes?: (abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>)[];

  /** Se este handler está habilitado (padrão: true) */
  readonly enabled?: boolean;
}
