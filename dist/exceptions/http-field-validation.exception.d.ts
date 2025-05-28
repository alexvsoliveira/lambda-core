import { HttpException } from './http.exception';
export declare class HttpFieldValidationException extends HttpException {
    constructor(errors: string[]);
}
