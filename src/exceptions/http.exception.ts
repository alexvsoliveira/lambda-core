import { LambdaHttpExceptionData } from '../interfaces/exception.interface';

export abstract class LambdaMainHttpException extends Error {
  public readonly response: LambdaHttpExceptionData;
  public readonly status: number;

  constructor(public exception: LambdaHttpExceptionData) {
    super();

    this.message = this.createErrorMessage(exception.message);

    this.response = exception;
    this.status = exception.statusCode;

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
  }

  private createErrorMessage(message: unknown): string {
    if (typeof message === 'string') {
      return message;
    }

    if (typeof message === 'object' && message !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messageObj = message as any;
      if ('message' in messageObj && typeof messageObj.message === 'string') {
        return messageObj.message;
      }
      return JSON.stringify(message);
    }

    return String(message);
  }

  public toString(): string {
    return JSON.stringify({
      statusCode: this.status,
      message: this.response.message,
      timestamp: this.response.timestamp || new Date().toISOString(),
    });
  }
}
