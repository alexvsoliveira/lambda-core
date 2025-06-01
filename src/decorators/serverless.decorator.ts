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

export const SERVERLESS_METADATA = 'serverless';

export function Serverless(config: ServerlessConfig): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SERVERLESS_METADATA, config, target);
  };
}
