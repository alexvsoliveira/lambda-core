import { APIGatewayProxyEvent } from 'aws-lambda';
export declare class ApiGatewayParsingStrategy {
    static parseBody<T>(event: APIGatewayProxyEvent): T;
}
