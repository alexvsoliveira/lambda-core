import { SetMetadata } from '@nestjs/common';

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

export const SERVERLESS_METADATA = 'serverless';

export const Serverless = (config: ServerlessConfig) =>
  SetMetadata(SERVERLESS_METADATA, config);
