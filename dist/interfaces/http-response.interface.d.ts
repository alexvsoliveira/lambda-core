export interface HttpResponse<T = any> {
    statusCode: number;
    body: T;
    headers?: Record<string, string>;
}
