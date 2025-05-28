export interface ExecutableHandler<TEvent = any, TResult = any> {
  execute(event: TEvent): Promise<TResult>;
}
