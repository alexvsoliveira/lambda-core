"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaApiGatewayHandler = void 0;
const http_field_error_handling_1 = require("../error-handling/http-error-handling/http-field-error-handling");
const http_field_validation_exception_1 = require("../exceptions/http-field-validation.exception");
const http_exception_1 = require("../exceptions/http.exception");
const api_gateway_parsing_strategy_1 = require("../strategies/api-gateway-parsing.strategy");
const base_lambda_handler_abstract_1 = require("./base-lambda-handler.abstract");
const http_status_enum_1 = require("../enums/http-status.enum");
class LambdaApiGatewayHandler extends base_lambda_handler_abstract_1.LambdaBaseLambdaHandler {
    get parsingStrategy() {
        return new api_gateway_parsing_strategy_1.LambdaApiGatewayParsingStrategy();
    }
    async execute(event) {
        try {
            const dto = this.parseDto(event);
            await http_field_error_handling_1.LambdaHttpFieldErrorHandling.validateAndThrowError(dto);
            const response = await this.handleBusinessLogic(dto);
            return this.convertToApiGatewayResponse(response);
        }
        catch (error) {
            return super.handleError(error, event);
        }
    }
    handleErrorResponse(error) {
        if (error instanceof http_field_validation_exception_1.LambdaHttpFieldValidationException) {
            return {
                statusCode: error.status,
                body: JSON.stringify({
                    message: error.message,
                    statusCode: error.status,
                    timestamp: new Date().toISOString(),
                }),
            };
        }
        if (error instanceof http_exception_1.LambdaMainHttpException) {
            return {
                statusCode: error.status,
                body: JSON.stringify({
                    message: error.response.message,
                    statusCode: error.status,
                    timestamp: new Date().toISOString(),
                }),
            };
        }
        return {
            statusCode: http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({
                message: error instanceof Error ? error.message : 'Internal server error occurred',
                statusCode: http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
            }),
        };
    }
    getSuccessStatusCode() {
        return http_status_enum_1.HttpStatus.OK;
    }
    convertToApiGatewayResponse(response) {
        // Verifica se a resposta tem a estrutura de HttpResponse
        if (this.isHttpResponse(response)) {
            return {
                statusCode: response.statusCode,
                body: JSON.stringify(response.body),
            };
        }
        // Se não for HttpResponse, retorna a resposta original
        return response;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isHttpResponse(response) {
        return (response && typeof response === 'object' && typeof response.statusCode === 'number' && response.body !== undefined);
    }
    extractMetadata(_error, event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!event) {
            return {};
        }
        return {
            // Informações da requisição HTTP
            requestId: (_a = event.requestContext) === null || _a === void 0 ? void 0 : _a.requestId,
            httpMethod: event.httpMethod,
            path: event.path,
            resource: event.resource,
            stage: (_b = event.requestContext) === null || _b === void 0 ? void 0 : _b.stage,
            // Headers relevantes (sem informações sensíveis)
            userAgent: ((_c = event.headers) === null || _c === void 0 ? void 0 : _c['User-Agent']) || ((_d = event.headers) === null || _d === void 0 ? void 0 : _d['user-agent']),
            contentType: ((_e = event.headers) === null || _e === void 0 ? void 0 : _e['Content-Type']) || ((_f = event.headers) === null || _f === void 0 ? void 0 : _f['content-type']),
            acceptLanguage: ((_g = event.headers) === null || _g === void 0 ? void 0 : _g['Accept-Language']) || ((_h = event.headers) === null || _h === void 0 ? void 0 : _h['accept-language']),
            // Informações de origem
            sourceIp: (_k = (_j = event.requestContext) === null || _j === void 0 ? void 0 : _j.identity) === null || _k === void 0 ? void 0 : _k.sourceIp,
            // Query parameters (apenas quantidade, não valores)
            queryParameterCount: event.queryStringParameters ? Object.keys(event.queryStringParameters).length : 0,
            // Path parameters (apenas quantidade, não valores)
            pathParameterCount: event.pathParameters ? Object.keys(event.pathParameters).length : 0,
            // Informações de timing
            requestTime: (_l = event.requestContext) === null || _l === void 0 ? void 0 : _l.requestTime,
            requestTimeEpoch: (_m = event.requestContext) === null || _m === void 0 ? void 0 : _m.requestTimeEpoch,
            // Domínio
            domainName: (_o = event.requestContext) === null || _o === void 0 ? void 0 : _o.domainName,
            apiId: (_p = event.requestContext) === null || _p === void 0 ? void 0 : _p.apiId,
        };
    }
}
exports.LambdaApiGatewayHandler = LambdaApiGatewayHandler;
