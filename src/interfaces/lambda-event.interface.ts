export interface LambdaEvent<T = any> {
  raw: T;
  parsed: any;
}
