export declare class HttpException extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly code: string;
    readonly details?: any | undefined;
    constructor(message: string, statusCode?: number, code?: string, details?: any | undefined);
}
