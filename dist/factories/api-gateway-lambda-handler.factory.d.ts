import { ExecutableHandler } from '../interfaces/executable-hander.interface';
export declare class LambdaApiGatewayHandlerFactory {
    static createHandlerFromClass<TEvent, TResult, T extends new () => ExecutableHandler<TEvent, TResult>>(HandlerClass: T): (event: TEvent) => Promise<TResult>;
}
