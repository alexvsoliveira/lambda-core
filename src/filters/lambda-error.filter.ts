import { APIGatewayProxyResult } from 'aws-lambda';

export class LambdaErrorFilter {
  static handle(error: unknown): APIGatewayProxyResult {
    if (error instanceof Error) {
      console.error('[ERROR]', error.message, error.stack);
    } else {
      console.error('[ERROR - Unknown]', JSON.stringify(error));
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: 'Internal server error',
      }),
    };
  }

  static handleWithMessage(
    message: string,
    error: unknown,
  ): APIGatewayProxyResult {
    if (error instanceof Error) {
      console.error(`[${message}]`, error.message, error.stack);
    } else {
      console.error(`[${message} - Unknown]`, JSON.stringify(error));
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message,
      }),
    };
  }
}
