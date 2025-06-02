/**
 * Contexto de erro para Global Error Handler
 *
 * Contém informações relevantes sobre o erro e o estado atual
 * do handler no momento da ocorrência do erro.
 */
export interface ErrorContext {
    /** Evento original que causou o erro */
    readonly originalEvent: unknown;
    /** Nome do handler onde o erro ocorreu */
    readonly handlerName: string;
    /** Timestamp de quando o erro ocorreu */
    readonly timestamp: Date;
    /** Metadata específica do handler (ex: requestId, httpMethod, etc.) */
    readonly metadata?: Record<string, unknown>;
}
