import { validate } from 'class-validator';
import { LambdaHttpFieldValidationException } from '../../exceptions/http-field-validation.exception';
import { LambdaValidationUtil } from '../../utils/validation.util';

export class LambdaHttpFieldErrorHandling {
  public static async validateAndThrowError<T extends Object>(dto: T): Promise<void> {
    const errors = await validate(dto, {
      validationError: {
        target: false,
        value: false,
      },
      enableDebugMessages: true,
    });

    if (errors.length === 0) {
      return;
    }

    const fieldErrors = LambdaValidationUtil.getAllFieldErrors(errors);
    throw new LambdaHttpFieldValidationException(fieldErrors);
  }
}
