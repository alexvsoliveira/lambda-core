import { APIGatewayProxyResult } from 'aws-lambda';
export declare class LambdaErrorFilter {
    static handle(error: unknown): APIGatewayProxyResult;
    static handleWithMessage(message: string, error: unknown): APIGatewayProxyResult;
}
