import { ErrorContext } from './error-context.interface';

/**
 * Classe abstrata base para Global Error Handlers
 *
 * Implementa funcionalidades automáticas como:
 * - name: extraído automaticamente do nome da classe
 * - canHandle: implementado automaticamente baseado nos errorTypes
 *
 * Handlers precisam implementar apenas o método handle().
 */
export abstract class GlobalErrorHandler {
  /**
   * Nome do handler extraído automaticamente do nome da classe
   * ✨ Zero configuração necessária!
   */
  get name(): string {
    return this.constructor.name;
  }

  /**
   * Tipos de erro que este handler trata (setados pela configuração)
   * @private Usado internamente pelo sistema
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private errorTypes: (abstract new (...args: any[]) => Error)[] = [];

  /**
   * Verifica se este handler pode tratar o erro especificado
   * ✨ Implementação automática baseada nos errorTypes!
   *
   * @param error - Erro a ser verificado
   * @returns true se pode tratar o erro, false caso contrário
   */
  canHandle(error: unknown): boolean {
    // Se não tem tipos específicos, aceita todos os erros
    if (this.errorTypes.length === 0) {
      return error instanceof Error;
    }

    // Verifica se o erro é de algum dos tipos registrados
    return this.errorTypes.some((ErrorType) => error instanceof ErrorType);
  }

  /**
   * Método interno para configurar os tipos de erro
   * Usado apenas pelo sistema de registro - não chamar diretamente
   *
   * @param errorTypes - Array de construtores de erro
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _setErrorTypes(errorTypes: (abstract new (...args: any[]) => Error)[]): void {
    this.errorTypes = errorTypes;
  }

  /**
   * Método principal que deve ser implementado pelos handlers
   *
   * @param error - Erro a ser tratado
   * @param context - Contexto do erro com informações adicionais
   */
  abstract handle(error: Error, context: ErrorContext): Promise<void>;
}
