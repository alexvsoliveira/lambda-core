export interface LambdaHttpResponse<T> {
  statusCode: number;
  body: {
    message: T;
    statusCode: number;
    timestamp?: string;
  };
}

export interface LambdaApiGatewayResponse {
  statusCode: number;
  body: string;
}
