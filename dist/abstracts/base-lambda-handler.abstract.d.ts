export declare abstract class BaseLambdaHandler<TInput = any, TOutput = any> {
    abstract execute(event: TInput): Promise<TOutput>;
}
