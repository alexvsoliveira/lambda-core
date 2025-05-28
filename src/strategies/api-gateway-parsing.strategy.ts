import { APIGatewayProxyEvent } from 'aws-lambda';

export class ApiGatewayParsingStrategy {
  static parseBody<T>(event: APIGatewayProxyEvent): T {
    try {
      return JSON.parse(event.body ?? '{}') as T;
    } catch (err) {
      console.log(err);
      throw new Error('Invalid JSON body');
    }
  }
}
