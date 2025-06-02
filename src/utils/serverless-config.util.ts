import 'reflect-metadata';
import {
  SERVERLESS_METADATA,
  ServerlessConfig,
} from '../decorators/serverless.decorator';
import * as fs from 'fs';
import * as path from 'path';

export class ServerlessConfigGenerator {
  private static getFilesRecursively(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files.push(...this.getFilesRecursively(fullPath));
      } else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  static generateConfig(srcPath: string) {
    const files = this.getFilesRecursively(srcPath);
    const resources: Record<string, any> = {};
    const functions: Record<string, any> = {};

    for (const file of files) {
      try {
        const module = require(file);
        for (const key in module) {
          const item = module[key];
          if (typeof item === 'function') {
            const metadata: ServerlessConfig = Reflect.getMetadata(
              SERVERLESS_METADATA,
              item,
            );

            if (metadata) {
              if (metadata.resource) {
                const { name, type, properties } = metadata.resource;
                resources[name] = {
                  Type: `AWS::${type}::Topic`,
                  Properties: properties,
                };
              }

              if (metadata.function) {
                const { name, events } = metadata.function;
                const relativePath = file
                .replace(process.cwd(), '') // remove o root do projeto
                .replace(/^\/?src\//, 'src/') // força início com src/
                .replace(/\.ts$|\.js$/, '') // remove extensão
                .replace(/\\/g, '/'); // Windows compatível

                functions[name] = {
                  handler: `${relativePath}.handler`,
                  events: events?.map((event) => ({
                    [event.type]: event.properties,
                  })),
                };
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }

    return { resources: { Resources: resources }, functions };
  }
}
