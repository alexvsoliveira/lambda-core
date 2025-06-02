import { Compiler } from 'webpack';
/**
 * Plugin webpack para o Lambda Core que automaticamente
 * descobre e registra error handlers baseados em padrão de arquivo
 */
export declare class LambdaCoreWebpackPlugin {
    private readonly directoryPath;
    private readonly definitions;
    /**
     * @param directoryPath Caminho do diretório para buscar arquivos .error-handler.ts
     */
    constructor(directoryPath: string);
    /**
     * Resolve caminhos de diretório para caminhos de arquivo reais
     * @param directoryPath Caminho do diretório para buscar
     * @returns Array de caminhos de arquivos encontrados
     */
    private resolveDefinitions;
    /**
     * Aplica o plugin ao compilador webpack
     * @param compiler Instância do compilador webpack
     */
    apply(compiler: Compiler): void;
}
