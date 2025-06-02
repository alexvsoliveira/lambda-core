"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.TransformProperty = exports.Transform = exports.Expose = exports.ValidateNested = exports.IsString = exports.IsOptional = exports.IsNumber = exports.IsNotEmpty = exports.IsEmail = exports.IsArray = exports.LambdaCoreWebpackPlugin = exports.ServerlessConfigGenerator = exports.LambdaValidationUtil = exports.LambdaDtoUtil = exports.LambdaHttpFieldErrorHandling = exports.LambdaMainHttpException = exports.LambdaHttpFieldValidationException = exports.GlobalErrorHandlerRegistry = exports.Serverless = exports.ErrorHandler = exports.GlobalErrorHandler = exports.ScheduledParsingStrategy = exports.SqsParsingStrategy = exports.SnsParsingStrategy = exports.LambdaApiGatewayParsingStrategy = exports.ScheduledLambdaHandlerFactory = exports.SqsLambdaHandlerFactory = exports.SnsLambdaHandlerFactory = exports.LambdaApiGatewayHandlerFactory = exports.ScheduledLambdaHandler = exports.SqsLambdaHandler = exports.SnsLambdaHandler = exports.LambdaBaseLambdaHandler = exports.LambdaApiGatewayHandler = void 0;
// ============================================================================
// ABSTRACTS - Classes Base para Handlers
// ============================================================================
var api_gateway_lambda_handler_abstract_1 = require("./abstracts/api-gateway-lambda-handler.abstract");
Object.defineProperty(exports, "LambdaApiGatewayHandler", { enumerable: true, get: function () { return api_gateway_lambda_handler_abstract_1.LambdaApiGatewayHandler; } });
var base_lambda_handler_abstract_1 = require("./abstracts/base-lambda-handler.abstract");
Object.defineProperty(exports, "LambdaBaseLambdaHandler", { enumerable: true, get: function () { return base_lambda_handler_abstract_1.LambdaBaseLambdaHandler; } });
var sns_lambda_handler_abstract_1 = require("./abstracts/sns-lambda-handler.abstract");
Object.defineProperty(exports, "SnsLambdaHandler", { enumerable: true, get: function () { return sns_lambda_handler_abstract_1.SnsLambdaHandler; } });
var sqs_lambda_handler_abstract_1 = require("./abstracts/sqs-lambda-handler.abstract");
Object.defineProperty(exports, "SqsLambdaHandler", { enumerable: true, get: function () { return sqs_lambda_handler_abstract_1.SqsLambdaHandler; } });
var scheduled_lambda_handler_abstract_1 = require("./abstracts/scheduled-lambda-handler.abstract");
Object.defineProperty(exports, "ScheduledLambdaHandler", { enumerable: true, get: function () { return scheduled_lambda_handler_abstract_1.ScheduledLambdaHandler; } });
// ============================================================================
// FACTORIES - Criação de Handlers
// ============================================================================
var api_gateway_lambda_handler_factory_1 = require("./factories/api-gateway-lambda-handler.factory");
Object.defineProperty(exports, "LambdaApiGatewayHandlerFactory", { enumerable: true, get: function () { return api_gateway_lambda_handler_factory_1.LambdaApiGatewayHandlerFactory; } });
var sns_lambda_handler_factory_1 = require("./factories/sns-lambda-handler.factory");
Object.defineProperty(exports, "SnsLambdaHandlerFactory", { enumerable: true, get: function () { return sns_lambda_handler_factory_1.SnsLambdaHandlerFactory; } });
var sqs_lambda_handler_factory_1 = require("./factories/sqs-lambda-handler.factory");
Object.defineProperty(exports, "SqsLambdaHandlerFactory", { enumerable: true, get: function () { return sqs_lambda_handler_factory_1.SqsLambdaHandlerFactory; } });
var scheduled_lambda_handler_factory_1 = require("./factories/scheduled-lambda-handler.factory");
Object.defineProperty(exports, "ScheduledLambdaHandlerFactory", { enumerable: true, get: function () { return scheduled_lambda_handler_factory_1.ScheduledLambdaHandlerFactory; } });
// ============================================================================
// STRATEGIES - Parsing de Eventos
// ============================================================================
var api_gateway_parsing_strategy_1 = require("./strategies/api-gateway-parsing.strategy");
Object.defineProperty(exports, "LambdaApiGatewayParsingStrategy", { enumerable: true, get: function () { return api_gateway_parsing_strategy_1.LambdaApiGatewayParsingStrategy; } });
var sns_parsing_strategy_1 = require("./strategies/sns-parsing.strategy");
Object.defineProperty(exports, "SnsParsingStrategy", { enumerable: true, get: function () { return sns_parsing_strategy_1.SnsParsingStrategy; } });
var sqs_parsing_strategy_1 = require("./strategies/sqs-parsing.strategy");
Object.defineProperty(exports, "SqsParsingStrategy", { enumerable: true, get: function () { return sqs_parsing_strategy_1.SqsParsingStrategy; } });
var scheduled_parsing_strategy_1 = require("./strategies/scheduled-parsing.strategy");
Object.defineProperty(exports, "ScheduledParsingStrategy", { enumerable: true, get: function () { return scheduled_parsing_strategy_1.ScheduledParsingStrategy; } });
var global_error_handler_interface_1 = require("./error-handling/global-error-handling/interfaces/global-error-handler.interface");
Object.defineProperty(exports, "GlobalErrorHandler", { enumerable: true, get: function () { return global_error_handler_interface_1.GlobalErrorHandler; } });
// ============================================================================
// DECORATORS - Decoradores para Error Handling
// ============================================================================
var error_handler_decorator_1 = require("./error-handling/global-error-handling/decorators/error-handler.decorator");
Object.defineProperty(exports, "ErrorHandler", { enumerable: true, get: function () { return error_handler_decorator_1.ErrorHandler; } });
var serverless_decorator_1 = require("./decorators/serverless.decorator");
Object.defineProperty(exports, "Serverless", { enumerable: true, get: function () { return serverless_decorator_1.Serverless; } });
// ============================================================================
// REGISTRIES - Registro de Handlers Globais
// ============================================================================
var global_error_handler_registry_1 = require("./error-handling/global-error-handling/registry/global-error-handler-registry");
Object.defineProperty(exports, "GlobalErrorHandlerRegistry", { enumerable: true, get: function () { return global_error_handler_registry_1.GlobalErrorHandlerRegistry; } });
// ============================================================================
// EXCEPTIONS - Classes de Exceção
// ============================================================================
var http_field_validation_exception_1 = require("./exceptions/http-field-validation.exception");
Object.defineProperty(exports, "LambdaHttpFieldValidationException", { enumerable: true, get: function () { return http_field_validation_exception_1.LambdaHttpFieldValidationException; } });
var http_exception_1 = require("./exceptions/http.exception");
Object.defineProperty(exports, "LambdaMainHttpException", { enumerable: true, get: function () { return http_exception_1.LambdaMainHttpException; } });
// ============================================================================
// ERROR HANDLING - Manipuladores de Erro
// ============================================================================
var http_field_error_handling_1 = require("./error-handling/http-error-handling/http-field-error-handling");
Object.defineProperty(exports, "LambdaHttpFieldErrorHandling", { enumerable: true, get: function () { return http_field_error_handling_1.LambdaHttpFieldErrorHandling; } });
// ============================================================================
// UTILITIES - Utilitários e Helpers
// ============================================================================
var dto_util_1 = require("./utils/dto.util");
Object.defineProperty(exports, "LambdaDtoUtil", { enumerable: true, get: function () { return dto_util_1.LambdaDtoUtil; } });
var validation_util_1 = require("./utils/validation.util");
Object.defineProperty(exports, "LambdaValidationUtil", { enumerable: true, get: function () { return validation_util_1.LambdaValidationUtil; } });
var serverless_config_util_1 = require("./utils/serverless-config.util");
Object.defineProperty(exports, "ServerlessConfigGenerator", { enumerable: true, get: function () { return serverless_config_util_1.ServerlessConfigGenerator; } });
// ============================================================================
// PLUGINS - Plugins para Build e Webpack
// ============================================================================
var lambda_core_webpack_plugin_1 = require("./plugins/lambda-core-webpack.plugin");
Object.defineProperty(exports, "LambdaCoreWebpackPlugin", { enumerable: true, get: function () { return lambda_core_webpack_plugin_1.LambdaCoreWebpackPlugin; } });
// Re-exportamos decoradores importantes do class-validator para conveniência
var class_validator_1 = require("class-validator");
Object.defineProperty(exports, "IsArray", { enumerable: true, get: function () { return class_validator_1.IsArray; } });
Object.defineProperty(exports, "IsEmail", { enumerable: true, get: function () { return class_validator_1.IsEmail; } });
Object.defineProperty(exports, "IsNotEmpty", { enumerable: true, get: function () { return class_validator_1.IsNotEmpty; } });
Object.defineProperty(exports, "IsNumber", { enumerable: true, get: function () { return class_validator_1.IsNumber; } });
Object.defineProperty(exports, "IsOptional", { enumerable: true, get: function () { return class_validator_1.IsOptional; } });
Object.defineProperty(exports, "IsString", { enumerable: true, get: function () { return class_validator_1.IsString; } });
Object.defineProperty(exports, "ValidateNested", { enumerable: true, get: function () { return class_validator_1.ValidateNested; } });
// Re-exportamos decoradores importantes do class-transformer para conveniência
var class_transformer_1 = require("class-transformer");
Object.defineProperty(exports, "Expose", { enumerable: true, get: function () { return class_transformer_1.Expose; } });
Object.defineProperty(exports, "Transform", { enumerable: true, get: function () { return class_transformer_1.Transform; } });
Object.defineProperty(exports, "TransformProperty", { enumerable: true, get: function () { return class_transformer_1.Transform; } });
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return class_transformer_1.Type; } });
// ============================================================================
// DEFAULT EXPORT - Export Principal
// ============================================================================
exports.default = {
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
