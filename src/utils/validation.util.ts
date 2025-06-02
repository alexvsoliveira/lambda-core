import { ValidationError } from 'class-validator';
import { LambdaValidationFieldErrors } from '../types/validation.type';

export class LambdaValidationUtil {
  public static getAllFieldErrors(
    validationErrors: ValidationError[],
    fieldErrors: LambdaValidationFieldErrors = {},
  ): LambdaValidationFieldErrors {
    validationErrors.forEach((error: ValidationError) => {
      const fieldName = error.property;
      fieldErrors[fieldName] = [];

      // Esse campo possui mensagens de erro a serem exibidas?
      if (error.constraints) {
        fieldErrors[fieldName] = Object.values(error.constraints);
      }

      // Esse campo possui outros campos aninhados a serem validados?
      if (error.children && error.children.length > 0) {
        fieldErrors[fieldName] = this.getAllFieldErrors(error.children);
      }
    });

    return fieldErrors;
  }
}
