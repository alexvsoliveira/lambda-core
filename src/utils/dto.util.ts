import { APIGatewayProxyEvent } from 'aws-lambda';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class LambdaDtoUtil {
  public static parseDataToDto<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain, {
      enableImplicitConversion: true,
      enableCircularCheck: true,
    });
  }

  public static fromAPIGatewayProxyEvent<T>(cls: ClassConstructor<T>, event: APIGatewayProxyEvent): T {
    return LambdaDtoUtil.parseDataToDto(cls, JSON.parse(event.body as string));
  }
}
