import { plainToInstance } from 'class-transformer';

export function transformToDto<T>(dtoClass: new () => T, input: unknown): T {
  return plainToInstance(dtoClass, input);
}
