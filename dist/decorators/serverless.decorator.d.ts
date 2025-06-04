import 'reflect-metadata';
type EventType = 'http' | 'schedule' | 'sns' | 'sqs';
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'any';
interface SimplifiedServerlessConfig {
    name: string;
    type: EventType;
    properties?: {
        path?: string;
        method?: HttpMethod;
        cors?: boolean;
        authorizer?: string | Record<string, any>;
        rate?: string[];
        topicName?: string;
        queueName?: string;
        batchSize?: number;
    };
    enabled?: boolean;
    resource?: 'SNS' | 'SQS' | 'Lambda';
}
export interface ServerlessConfig {
    resource?: {
        name: string;
        type: 'SNS' | 'SQS' | 'Lambda';
        properties?: Record<string, any>;
    };
    function?: {
        name: string;
        events?: {
            type: EventType;
            properties: Record<string, any>;
        }[];
    };
}
export declare const SERVERLESS_METADATA = "serverless";
export declare function Serverless(config: SimplifiedServerlessConfig): ClassDecorator;
export {};
