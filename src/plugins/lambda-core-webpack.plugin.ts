import * as crypto from 'crypto';
import * as glob from 'glob';
import * as path from 'path';
import { Compilation, Compiler } from 'webpack';

// Imports das dependências webpack
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const ProvidedDependency = require('webpack/lib/dependencies/ProvidedDependency');
const {
  JAVASCRIPT_MODULE_TYPE_DYNAMIC,
  JAVASCRIPT_MODULE_TYPE_AUTO,
  JAVASCRIPT_MODULE_TYPE_ESM,
} = require('webpack/lib/ModuleTypeConstants');

const PLUGIN_NAME = 'LambdaCoreWebpackPlugin';

interface PluginDefinitions {
  [key: string]: string[];
}

/**
 * Plugin webpack para o Lambda Core que automaticamente
 * descobre e registra error handlers baseados em padrão de arquivo
 */
export class LambdaCoreWebpackPlugin {
  private readonly directoryPath: string;
  private readonly definitions: string[];

  /**
   * @param directoryPath Caminho do diretório para buscar arquivos .error-handler.ts
   */
  constructor(directoryPath: string) {
    this.directoryPath = directoryPath;
    this.definitions = this.resolveDefinitions(directoryPath);
  }

  /**
   * Resolve caminhos de diretório para caminhos de arquivo reais
   * @param directoryPath Caminho do diretório para buscar
   * @returns Array de caminhos de arquivos encontrados
   */
  private resolveDefinitions(directoryPath: string): string[] {
    try {
      const pattern = path.join(directoryPath, '**/*.error-handler.ts').replace(/\\/g, '/');
      const files = glob.sync(pattern, { absolute: true });

      if (files.length === 0) return [];

      return files;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`LambdaCoreWebpackPlugin: Erro ao buscar arquivos em '${directoryPath}':`, error);
      return [];
    }
  }

  /**
   * Aplica o plugin ao compilador webpack
   * @param compiler Instância do compilador webpack
   */
  apply(compiler: Compiler): void {
    const files = this.definitions;

    if (files.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(`LambdaCoreWebpackPlugin: Nenhum arquivo .error-handler.ts encontrado em '${this.directoryPath}'`);
      return;
    }

    const hash = crypto.createHash('sha256').update('GlobalErrorHandler').digest('hex').substring(0, 10);
    const name = `GlobalErrorHandler_${hash}`;

    const definitions: PluginDefinitions = {
      [name]: files,
    };

    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (compilation: Compilation, { normalModuleFactory }: { normalModuleFactory: any }) => {
        compilation.dependencyTemplates.set(ConstDependency, new ConstDependency.Template());

        compilation.dependencyFactories.set(ProvidedDependency, normalModuleFactory);

        compilation.dependencyTemplates.set(ProvidedDependency, new ProvidedDependency.Template());

        /**
         * Handler para processar o parser JavaScript
         * @param parser Parser JavaScript do webpack
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (parser: any): void => {
          parser.hooks.program.tap(PLUGIN_NAME, () => {
            if (!parser.state.module._providedDependenciesAdded) {
              parser.state.module._providedDependenciesAdded = new Set<string>();
            }

            for (const definitionName of Object.keys(definitions)) {
              if (parser.state.module._providedDependenciesAdded.has(definitionName)) {
                continue;
              }

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const request: string[] = [].concat(definitions[definitionName] as any);
              const nameIdentifier = definitionName.includes('.')
                ? `__webpack_provided_${definitionName.replace(/\./g, '_dot_')}`
                : definitionName;

              const dep = new ProvidedDependency(request[0], nameIdentifier, request.slice(1), [0, 0]);

              dep.loc = { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } };
              parser.state.module.addDependency(dep);

              parser.state.module._providedDependenciesAdded.add(definitionName);
            }
          });
        };

        normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_AUTO).tap(PLUGIN_NAME, handler);
        normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_DYNAMIC).tap(PLUGIN_NAME, handler);
        normalModuleFactory.hooks.parser.for(JAVASCRIPT_MODULE_TYPE_ESM).tap(PLUGIN_NAME, handler);
      },
    );
  }
}
