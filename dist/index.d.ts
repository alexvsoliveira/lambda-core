/**
 * @elfa/lambda-core
 *
 * Framework reutilizável para criação de handlers Lambda com suporte a:
 * - API Gateway
 * - SNS
 * - SQS
 *
 * Implementa padrões Template Method, Strategy e Factory Method
 * para máxima reutilização e manutenibilidade.
 *
 * @version 1.0.0
 * @author ELFA Team
 */
export { LambdaApiGatewayHandler } from './abstracts/api-gateway-lambda-handler.abstract';
export { LambdaBaseLambdaHandler } from './abstracts/base-lambda-handler.abstract';
export { SnsLambdaHandler } from './abstracts/sns-lambda-handler.abstract';
export { SqsLambdaHandler } from './abstracts/sqs-lambda-handler.abstract';
export { ScheduledLambdaHandler } from './abstracts/scheduled-lambda-handler.abstract';
export { LambdaApiGatewayHandlerFactory } from './factories/api-gateway-lambda-handler.factory';
export { SnsLambdaHandlerFactory } from './factories/sns-lambda-handler.factory';
export { SqsLambdaHandlerFactory } from './factories/sqs-lambda-handler.factory';
export { ScheduledLambdaHandlerFactory } from './factories/scheduled-lambda-handler.factory';
export { LambdaApiGatewayParsingStrategy } from './strategies/api-gateway-parsing.strategy';
export { SnsParsingStrategy } from './strategies/sns-parsing.strategy';
export { SqsParsingStrategy } from './strategies/sqs-parsing.strategy';
export { ScheduledParsingStrategy } from './strategies/scheduled-parsing.strategy';
export { LambdaEventParsingStrategy } from './interfaces/lambda-event.interface';
export { LambdaApiGatewayResponse, LambdaHttpResponse } from './interfaces/http-response.interface';
export { LambdaHttpExceptionData } from './interfaces/exception.interface';
export { ErrorContext } from './error-handling/global-error-handling/interfaces/error-context.interface';
export { ErrorHandlerConfig } from './error-handling/global-error-handling/interfaces/error-handler-decorator.interface';
export { ErrorHandlerRegistration } from './error-handling/global-error-handling/interfaces/error-handler-registration.interface';
export { GlobalErrorHandler } from './error-handling/global-error-handling/interfaces/global-error-handler.interface';
export type { LambdaValidationFieldErrors } from './types/validation.type';
export { ErrorHandler } from './error-handling/global-error-handling/decorators/error-handler.decorator';
export { Serverless } from './decorators/serverless.decorator';
export { ServerlessConfig } from './decorators/serverless.decorator';
export { GlobalErrorHandlerRegistry } from './error-handling/global-error-handling/registry/global-error-handler-registry';
export { LambdaHttpFieldValidationException } from './exceptions/http-field-validation.exception';
export { LambdaMainHttpException } from './exceptions/http.exception';
export { LambdaHttpFieldErrorHandling } from './error-handling/http-error-handling/http-field-error-handling';
export { LambdaDtoUtil } from './utils/dto.util';
export { LambdaValidationUtil } from './utils/validation.util';
export { ServerlessConfigGenerator } from './utils/serverless-config.util';
export { LambdaCoreWebpackPlugin } from './plugins/lambda-core-webpack.plugin';
export type { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Context, SNSEvent, SQSEvent, } from 'aws-lambda';
export { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
export { Expose, Transform, Transform as TransformProperty, Type } from 'class-transformer';
declare const _default: {
    LambdaApiGatewayHandler: any;
    SnsLambdaHandler: any;
    SqsLambdaHandler: any;
    ScheduledLambdaHandler: any;
    LambdaApiGatewayHandlerFactory: any;
    SnsLambdaHandlerFactory: any;
    SqsLambdaHandlerFactory: any;
    ScheduledLambdaHandlerFactory: any;
    LambdaDtoUtil: any;
    LambdaValidationUtil: any;
    ServerlessConfigGenerator: any;
    ErrorHandler: any;
    GlobalErrorHandlerRegistry: any;
    Serverless: any;
    ServerlessConfig: any;
    LambdaMainHttpException: any;
    LambdaHttpFieldValidationException: any;
    LambdaFrameworkWebpackPlugin: any;
};
export default _default;
