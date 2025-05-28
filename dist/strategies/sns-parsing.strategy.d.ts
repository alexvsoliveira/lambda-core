import { SNSEvent } from 'aws-lambda';
export declare class SnsParsingStrategy {
    static parseMessages<T>(event: SNSEvent): T[];
}
