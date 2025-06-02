"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
/**
 * Classe abstrata base para Global Error Handlers
 *
 * Implementa funcionalidades automáticas como:
 * - name: extraído automaticamente do nome da classe
 * - canHandle: implementado automaticamente baseado nos errorTypes
 *
 * Handlers precisam implementar apenas o método handle().
 */
class GlobalErrorHandler {
    constructor() {
        /**
         * Tipos de erro que este handler trata (setados pela configuração)
         * @private Usado internamente pelo sistema
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.errorTypes = [];
    }
    /**
     * Nome do handler extraído automaticamente do nome da classe
     * ✨ Zero configuração necessária!
     */
    get name() {
        return this.constructor.name;
    }
    /**
     * Verifica se este handler pode tratar o erro especificado
     * ✨ Implementação automática baseada nos errorTypes!
     *
     * @param error - Erro a ser verificado
     * @returns true se pode tratar o erro, false caso contrário
     */
    canHandle(error) {
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
    _setErrorTypes(errorTypes) {
        this.errorTypes = errorTypes;
    }
}
exports.GlobalErrorHandler = GlobalErrorHandler;
