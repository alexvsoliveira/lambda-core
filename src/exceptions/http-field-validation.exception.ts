import { HttpStatus } from '../enums/http-status.enum';
import { LambdaValidationFieldErrors } from '../types/validation.type';
import { LambdaMainHttpException } from './http.exception';

export class LambdaHttpFieldValidationException extends LambdaMainHttpException {
  constructor(public errors: LambdaValidationFieldErrors) {
    super({
      message: errors,
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
    });
  }
}
