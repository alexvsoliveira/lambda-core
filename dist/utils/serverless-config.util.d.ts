export declare class ServerlessConfigGenerator {
    private static getFilesRecursively;
    static generateConfig(srcPath: string): {
        resources: {
            Resources: Record<string, any>;
        };
        functions: Record<string, any>;
    };
}
