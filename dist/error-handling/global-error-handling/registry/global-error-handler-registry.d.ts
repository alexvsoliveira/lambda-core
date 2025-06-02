import { LambdaBaseLambdaHandler } from '../../../abstracts/base-lambda-handler.abstract';
import { ErrorHandlerRegistration } from '../interfaces/error-handler-registration.interface';
import { GlobalErrorHandler } from '../interfaces/global-error-handler.interface';
/**
 * Registry central para Global Error Handlers
 *
 * Gerencia o registro e busca de error handlers usando singleton pattern.
 * Implementa lógica de prioridade: handlers específicos antes de globais.
 */
export declare class GlobalErrorHandlerRegistry {
    private static instance;
    private readonly handlers;
    /**
     * Construtor privado para singleton pattern
     */
    private constructor();
    static getInstance(): GlobalErrorHandlerRegistry;
    register(config: ErrorHandlerRegistration, handler: GlobalErrorHandler): void;
    getHandler(error: unknown, handlerClass: abstract new (...args: any[]) => LambdaBaseLambdaHandler<any, any, any, any, any>): GlobalErrorHandler[] | null;
    getRegisteredHandlers(): Array<{
        key: string;
        handlerName: string;
    }>;
    private createKey;
    private keyMatchesHandler;
    /**
     * Verifica se uma classe é uma instância ou herda de uma classe pai específica
     */
    private isInstanceOf;
    private keyMatchesGlobal;
}
