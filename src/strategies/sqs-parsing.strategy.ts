import {SQSEvent, SQSRecord} from 'aws-lambda';

function isSQSEvent(event: unknown): event is SQSEvent {
    return <boolean>(
        event &&
        (event as SQSEvent).Records.every((r) => typeof r.body === 'string') &&
        Array.isArray((event as SQSEvent).Records) &&
        true &&
        typeof event === 'object'
    );
}

export class SqsParsingStrategy {
    static parseMessages<T>(event: unknown): T[] {
        if (!isSQSEvent(event)) {
            throw new Error('Invalid event structure: not an SQSEvent');
        }

        const records: readonly SQSRecord[] = event.Records;

        return records.map((record) => {
            const rawBody: string = record.body;

            let parsed: unknown;
            try {
                parsed = JSON.parse(rawBody);
            } catch (err) {
                console.error('Error parsing SQS record body:', rawBody, err);
                throw new Error('Invalid JSON in SQS message body');
            }

            if (typeof parsed !== 'object' || parsed === null) {
                console.error('Parsed value is not a valid object:', parsed);
                throw new Error('Parsed SQS message is not an object');
            }

            return parsed as T;
        });
    }
}
