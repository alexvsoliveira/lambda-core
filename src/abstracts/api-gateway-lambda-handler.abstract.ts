import {BaseLambdaHandler} from './base-lambda-handler.abstract';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {LambdaErrorFilter} from '../filters/lambda-error.filter';

export abstract class LambdaApiGatewayHandler<
    TDto,
    TResponse,
> extends BaseLambdaHandler<APIGatewayProxyEvent, APIGatewayProxyResult> {
    protected abstract dtoClass: new () => TDto;

    protected abstract handleBusinessLogic(dto: TDto): Promise<TResponse>;

    protected getSuccessStatusCode(): number {
        return 200;
    }

    protected handleError(error: unknown): APIGatewayProxyResult {
        return LambdaErrorFilter.handle(error);
    }

    async execute(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            let parsed: unknown;

            try {
                parsed = JSON.parse(event?.body ?? '{}');
            } catch (err) {
                console.error('Failed to parse request body:', err);
                throw new Error('Invalid JSON');
            }

            if (typeof parsed !== 'object' || parsed === null) {
                throw new Error('Parsed body is not a valid object');
            }

            const rawBody = parsed as Record<string, unknown>;
            const dto: TDto = plainToInstance(this.dtoClass, rawBody);
            // @ts-ignore
            const errors = await validate(dto);
            if (errors.length > 0) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        error: true,
                        message: 'Validation failed',
                        details: errors,
                    }),
                };
            }

            const result = await this.handleBusinessLogic(dto);
            return {
                statusCode: this.getSuccessStatusCode(),
                body: JSON.stringify(result),
            };
        } catch (error) {
            return this.handleError(error);
        }
    }
}
