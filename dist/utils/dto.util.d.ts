import { APIGatewayProxyEvent } from 'aws-lambda';
import { ClassConstructor } from 'class-transformer';
export declare class LambdaDtoUtil {
    static parseDataToDto<T, V>(cls: ClassConstructor<T>, plain: V): T;
    static fromAPIGatewayProxyEvent<T>(cls: ClassConstructor<T>, event: APIGatewayProxyEvent): T;
}
