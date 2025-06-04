import 'reflect-metadata';

type EventType = 'http' | 'schedule' | 'sns' | 'sqs';
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'any';

interface SimplifiedServerlessConfig {
  name: string;
  type: EventType;
  properties?: {
    // Propriedades HTTP
    path?: string;
    method?: HttpMethod;
    cors?: boolean;
    authorizer?: string | Record<string, any>;
    // Propriedades Schedule
    rate?: string[];
    // Propriedades SNS/SQS
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

export const SERVERLESS_METADATA = 'serverless';

export function Serverless(config: SimplifiedServerlessConfig): ClassDecorator {
  return (target) => {
    // Converte a configuração simplificada para o formato interno
    const serverlessConfig: ServerlessConfig = {
      function: {
        name: config.name,
        events: [
          {
            type: config.type,
            properties: {
              ...config.properties,
              enabled: config.enabled
            }
          }
        ]
      }
    };

    // Adiciona resource se especificado
    if (config.resource) {
      serverlessConfig.resource = {
        name: config.name,
        type: config.resource,
        properties: config.properties
      };
    }

    Reflect.defineMetadata(SERVERLESS_METADATA, serverlessConfig, target);
  };
}
