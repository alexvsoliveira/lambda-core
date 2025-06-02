import { LambdaBaseLambdaHandler } from '../../../abstracts/base-lambda-handler.abstract';
import { ErrorHandlerRegistration } from '../interfaces/error-handler-registration.interface';
import { GlobalErrorHandler } from '../interfaces/global-error-handler.interface';

/**
 * Registry central para Global Error Handlers
 *
 * Gerencia o registro e busca de error handlers usando singleton pattern.
 * Implementa lógica de prioridade: handlers específicos antes de globais.
 */
export class GlobalErrorHandlerRegistry {
  private static instance: GlobalErrorHandlerRegistry;
  private readonly handlers = new Map<string, GlobalErrorHandler>();

  /**
   * Construtor privado para singleton pattern
   */
  private constructor() {}

  static getInstance(): GlobalErrorHandlerRegistry {
    if (!GlobalErrorHandlerRegistry.instance) {
      GlobalErrorHandlerRegistry.instance = new GlobalErrorHandlerRegistry();
    }
    return GlobalErrorHandlerRegistry.instance;
  }

  register(config: ErrorHandlerRegistration, handler: GlobalErrorHandler): void {
    const key = this.createKey(config.errorTypes, config.handlerTypes);

    if (this.handlers.has(key)) {
      const errorTypesNames = config.errorTypes?.map((t) => t.name).join(', ') || 'All';
      throw new Error(`Handler already registered for error types: ${errorTypesNames}`);
    }

    handler._setErrorTypes(config.errorTypes || []);

    this.handlers.set(key, handler);
  }

  getHandler(
    error: unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass: abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>,
  ): GlobalErrorHandler[] | null {
    const handlers = [];

    for (const [key, handler] of this.handlers) {
      if (this.keyMatchesHandler(key, handlerClass) && handler.canHandle(error)) {
        handlers.push(handler);
      }

      if (this.keyMatchesGlobal(key) && handler.canHandle(error)) {
        handlers.push(handler);
      }
    }

    return handlers;
  }

  getRegisteredHandlers(): Array<{ key: string; handlerName: string }> {
    return Array.from(this.handlers.entries()).map(([key, handler]) => ({
      key,
      handlerName: handler.name,
    }));
  }

  private createKey(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorTypes?: (abstract new (...args: any[]) => Error)[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerTypes?: (abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>)[],
  ): string {
    const errorTypesNames =
      errorTypes
        ?.map((t) => t.name)
        .sort()
        .join(',') || '*';
    const handlerTypesNames =
      handlerTypes
        ?.map((h) => h.name)
        .sort()
        .join(',') || '*';
    return `${errorTypesNames}:${handlerTypesNames}`;
  }

  private keyMatchesHandler(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass: abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>,
  ): boolean {
    const [, handlerTypesStr] = key.split(':');
    if (handlerTypesStr === '*') return false; // Handler global, não específico

    const handlerTypes = handlerTypesStr.split(',');

    // Verifica se o handlerClass é uma instância ou herda de algum dos handlerTypes
    return handlerTypes.some((handlerTypeName) => this.isInstanceOf(handlerClass, handlerTypeName));
  }

  /**
   * Verifica se uma classe é uma instância ou herda de uma classe pai específica
   */
  private isInstanceOf(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass: abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>,
    targetClassName: string,
  ): boolean {
    // Verifica se o nome da classe atual corresponde
    if (handlerClass.name === targetClassName) {
      return true;
    }

    // Verifica a cadeia de herança
    let currentClass = Object.getPrototypeOf(handlerClass);
    while (currentClass && currentClass.name !== 'Function') {
      if (currentClass.name === targetClassName) {
        return true;
      }
      currentClass = Object.getPrototypeOf(currentClass);
    }

    return false;
  }

  private keyMatchesGlobal(key: string): boolean {
    const [, handlerTypesStr] = key.split(':');
    return handlerTypesStr === '*'; // Apenas handlers globais
  }
}
