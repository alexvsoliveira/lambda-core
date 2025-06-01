import 'reflect-metadata';
export interface ServerlessConfig {
    resource?: {
        name: string;
        type: 'SNS' | 'SQS' | 'Lambda';
        properties?: Record<string, any>;
    };
    function?: {
        name: string;
        events?: {
            type: 'schedule' | 'sns' | 'sqs' | 'http';
            properties: Record<string, any>;
        }[];
    };
}
export declare const SERVERLESS_METADATA = "serverless";
export declare function Serverless(config: ServerlessConfig): ClassDecorator;
