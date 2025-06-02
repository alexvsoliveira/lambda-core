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

// ============================================================================
// ABSTRACTS - Classes Base para Handlers
// ============================================================================
export { LambdaApiGatewayHandler } from './abstracts/api-gateway-lambda-handler.abstract';
export { LambdaBaseLambdaHandler } from './abstracts/base-lambda-handler.abstract';
export { SnsLambdaHandler } from './abstracts/sns-lambda-handler.abstract';
export { SqsLambdaHandler } from './abstracts/sqs-lambda-handler.abstract';
export { ScheduledLambdaHandler } from './abstracts/scheduled-lambda-handler.abstract';

// ============================================================================
// FACTORIES - Criação de Handlers
// ============================================================================
export { LambdaApiGatewayHandlerFactory } from './factories/api-gateway-lambda-handler.factory';
export { SnsLambdaHandlerFactory } from './factories/sns-lambda-handler.factory';
export { SqsLambdaHandlerFactory } from './factories/sqs-lambda-handler.factory';
export { ScheduledLambdaHandlerFactory } from './factories/scheduled-lambda-handler.factory';

// ============================================================================
// STRATEGIES - Parsing de Eventos
// ============================================================================
export { LambdaApiGatewayParsingStrategy } from './strategies/api-gateway-parsing.strategy';
export { SnsParsingStrategy } from './strategies/sns-parsing.strategy';
export { SqsParsingStrategy } from './strategies/sqs-parsing.strategy';
export { ScheduledParsingStrategy } from './strategies/scheduled-parsing.strategy';

// ============================================================================
// INTERFACES - Contratos e Tipos Base
// ============================================================================

// Event Parsing Interfaces
export { LambdaEventParsingStrategy } from './interfaces/lambda-event.interface';

// HTTP Response Interfaces
export { LambdaApiGatewayResponse, LambdaHttpResponse } from './interfaces/http-response.interface';

// Exception Interfaces
export { LambdaHttpExceptionData } from './interfaces/exception.interface';

// Global Error Handling Interfaces
export { ErrorContext } from './error-handling/global-error-handling/interfaces/error-context.interface';
export { ErrorHandlerConfig } from './error-handling/global-error-handling/interfaces/error-handler-decorator.interface';
export { ErrorHandlerRegistration } from './error-handling/global-error-handling/interfaces/error-handler-registration.interface';
export { GlobalErrorHandler } from './error-handling/global-error-handling/interfaces/global-error-handler.interface';

// ============================================================================
// TYPES - Definições de Tipos
// ============================================================================
export type { LambdaValidationFieldErrors } from './types/validation.type';

// ============================================================================
// DECORATORS - Decoradores para Error Handling
// ============================================================================
export { ErrorHandler } from './error-handling/global-error-handling/decorators/error-handler.decorator';
export { Serverless } from './decorators/serverless.decorator';
export { ServerlessConfig } from './decorators/serverless.decorator';

// ============================================================================
// REGISTRIES - Registro de Handlers Globais
// ============================================================================
export { GlobalErrorHandlerRegistry } from './error-handling/global-error-handling/registry/global-error-handler-registry';

// ============================================================================
// EXCEPTIONS - Classes de Exceção
// ============================================================================
export { LambdaHttpFieldValidationException } from './exceptions/http-field-validation.exception';
export { LambdaMainHttpException } from './exceptions/http.exception';

// ============================================================================
// ERROR HANDLING - Manipuladores de Erro
// ============================================================================
export { LambdaHttpFieldErrorHandling } from './error-handling/http-error-handling/http-field-error-handling';

// ============================================================================
// UTILITIES - Utilitários e Helpers
// ============================================================================
export { LambdaDtoUtil } from './utils/dto.util';
export { LambdaValidationUtil } from './utils/validation.util';
export { ServerlessConfigGenerator } from './utils/serverless-config.util';

// ============================================================================
// PLUGINS - Plugins para Build e Webpack
// ============================================================================
export { LambdaCoreWebpackPlugin } from './plugins/lambda-core-webpack.plugin';

// ============================================================================
// RE-EXPORTS DE DEPENDÊNCIAS IMPORTANTES
// ============================================================================
// Re-exportamos alguns tipos importantes do AWS Lambda para conveniência
export type {
  APIGatewayEvent,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  SNSEvent,
  SQSEvent,
} from 'aws-lambda';

// Re-exportamos decoradores importantes do class-validator para conveniência
export { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

// Re-exportamos decoradores importantes do class-transformer para conveniência
export { Expose, Transform, Transform as TransformProperty, Type } from 'class-transformer';

// ============================================================================
// DEFAULT EXPORT - Export Principal
// ============================================================================
export default {
  // Handlers
  LambdaApiGatewayHandler: require('./abstracts/api-gateway-lambda-handler.abstract').LambdaApiGatewayHandler,
  SnsLambdaHandler: require('./abstracts/sns-lambda-handler.abstract').SnsLambdaHandler,
  SqsLambdaHandler: require('./abstracts/sqs-lambda-handler.abstract').SqsLambdaHandler,
  ScheduledLambdaHandler: require('./abstracts/scheduled-lambda-handler.abstract').ScheduledLambdaHandler,

  // Factories
  LambdaApiGatewayHandlerFactory: require('./factories/api-gateway-lambda-handler.factory')
    .LambdaApiGatewayHandlerFactory,
  SnsLambdaHandlerFactory: require('./factories/sns-lambda-handler.factory').SnsLambdaHandlerFactory,
  SqsLambdaHandlerFactory: require('./factories/sqs-lambda-handler.factory').SqsLambdaHandlerFactory,
  ScheduledLambdaHandlerFactory: require('./factories/scheduled-lambda-handler.factory').ScheduledLambdaHandlerFactory,

  // Utilities
  LambdaDtoUtil: require('./utils/dto.util').LambdaDtoUtil,
  LambdaValidationUtil: require('./utils/validation.util').LambdaValidationUtil,
  ServerlessConfigGenerator: require('./utils/serverless-config.util').ServerlessConfigGenerator,

  // Error Handling
  ErrorHandler: require('./error-handling/global-error-handling/decorators/error-handler.decorator').ErrorHandler,
  GlobalErrorHandlerRegistry: require('./error-handling/global-error-handling/registry/global-error-handler-registry')
    .GlobalErrorHandlerRegistry,
  Serverless: require('./decorators/serverless.decorator').Serverless,
  ServerlessConfig: require('./decorators/serverless.decorator').ServerlessConfig,


  // Exceptions
  LambdaMainHttpException: require('./exceptions/http.exception').LambdaMainHttpException,
  LambdaHttpFieldValidationException: require('./exceptions/http-field-validation.exception')
    .LambdaHttpFieldValidationException,

  // Plugins
  LambdaFrameworkWebpackPlugin: require('./plugins/lambda-core-webpack.plugin').LambdaFrameworkWebpackPlugin,
};
