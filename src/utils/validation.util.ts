import { validate } from 'class-validator';

export async function validateDto(dto: object): Promise<void> {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
}
