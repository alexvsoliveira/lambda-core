import { SNSEvent } from 'aws-lambda';

export class SnsParsingStrategy {
  static parseMessages<T>(event: SNSEvent): T[] {
    return event.Records.map((record) => {
      return JSON.parse(record.Sns.Message) as T;
    });
  }
}
