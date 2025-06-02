import { APIGatewayEvent } from 'aws-lambda';
import { LambdaHttpFieldErrorHandling } from '../error-handling/http-error-handling/http-field-error-handling';
import { LambdaHttpFieldValidationException } from '../exceptions/http-field-validation.exception';
import { LambdaMainHttpException } from '../exceptions/http.exception';
import { LambdaHttpResponse } from '../interfaces/http-response.interface';
import { LambdaEventParsingStrategy } from '../interfaces/lambda-event.interface';
import { LambdaApiGatewayParsingStrategy } from '../strategies/api-gateway-parsing.strategy';
import { LambdaBaseLambdaHandler } from './base-lambda-handler.abstract';
import { HttpStatus } from '../enums/http-status.enum';

export abstract class LambdaApiGatewayHandler<
  TDto extends Object,
  TSuccessResponse = LambdaHttpResponse<string>,
  TErrorResponse = LambdaHttpResponse<string>,
> extends LambdaBaseLambdaHandler<APIGatewayEvent, TDto, TSuccessResponse, TErrorResponse, TDto> {
  protected get parsingStrategy(): LambdaEventParsingStrategy<APIGatewayEvent, TDto, TDto> {
    return new LambdaApiGatewayParsingStrategy<TDto>();
  }

  public async execute(event: APIGatewayEvent): Promise<TSuccessResponse | TErrorResponse> {
    try {
      const dto = this.parseDto(event);

      await LambdaHttpFieldErrorHandling.validateAndThrowError<TDto>(dto);

      const response = await this.handleBusinessLogic(dto);

      return this.convertToApiGatewayResponse(response);
    } catch (error) {
      return super.handleError(error, event);
    }
  }

  protected handleErrorResponse(error: unknown): TErrorResponse {
    if (error instanceof LambdaHttpFieldValidationException) {
      return {
        statusCode: error.status,
        body: JSON.stringify({
          message: error.message,
          statusCode: error.status,
          timestamp: new Date().toISOString(),
        }),
      } as TErrorResponse;
    }

    if (error instanceof LambdaMainHttpException) {
      return {
        statusCode: error.status,
        body: JSON.stringify({
          message: error.response.message,
          statusCode: error.status,
          timestamp: new Date().toISOString(),
        }),
      } as TErrorResponse;
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : 'Internal server error occurred',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
      }),
    } as TErrorResponse;
  }

  protected getSuccessStatusCode(): HttpStatus {
    return HttpStatus.OK;
  }

  private convertToApiGatewayResponse(response: TSuccessResponse): TSuccessResponse {
    // Verifica se a resposta tem a estrutura de HttpResponse
    if (this.isHttpResponse(response)) {
      return {
        statusCode: response.statusCode,
        body: JSON.stringify(response.body),
      } as TSuccessResponse;
    }

    // Se não for HttpResponse, retorna a resposta original
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isHttpResponse(response: any): response is LambdaHttpResponse<any> {
    return (
      response && typeof response === 'object' && typeof response.statusCode === 'number' && response.body !== undefined
    );
  }

  protected extractMetadata(_error: unknown, event: APIGatewayEvent): Record<string, unknown> {
    if (!event) {
      return {};
    }

    return {
      // Informações da requisição HTTP
      requestId: event.requestContext?.requestId,
      httpMethod: event.httpMethod,
      path: event.path,
      resource: event.resource,
      stage: event.requestContext?.stage,

      // Headers relevantes (sem informações sensíveis)
      userAgent: event.headers?.['User-Agent'] || event.headers?.['user-agent'],
      contentType: event.headers?.['Content-Type'] || event.headers?.['content-type'],
      acceptLanguage: event.headers?.['Accept-Language'] || event.headers?.['accept-language'],

      // Informações de origem
      sourceIp: event.requestContext?.identity?.sourceIp,

      // Query parameters (apenas quantidade, não valores)
      queryParameterCount: event.queryStringParameters ? Object.keys(event.queryStringParameters).length : 0,

      // Path parameters (apenas quantidade, não valores)
      pathParameterCount: event.pathParameters ? Object.keys(event.pathParameters).length : 0,

      // Informações de timing
      requestTime: event.requestContext?.requestTime,
      requestTimeEpoch: event.requestContext?.requestTimeEpoch,

      // Domínio
      domainName: event.requestContext?.domainName,
      apiId: event.requestContext?.apiId,
    };
  }
}
