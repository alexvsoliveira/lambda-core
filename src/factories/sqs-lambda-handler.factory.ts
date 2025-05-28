import {ExecutableHandler} from "../interfaces/executable-hander.interface";

export class SqsLambdaHandlerFactory {
  static createHandlerFromClass<
    TEvent,
    TResult,
    T extends new () => ExecutableHandler<TEvent, TResult>,
  >(HandlerClass: T): (event: TEvent) => Promise<TResult> {
    const instance = new HandlerClass();
    return instance.execute.bind(instance);
  }
}
