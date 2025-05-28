import { HttpException } from './http.exception';

export class HttpFieldValidationException extends HttpException {
  constructor(errors: string[]) {
    super('Validation Failed', 400, 'VALIDATION_ERROR', errors);
  }
}
