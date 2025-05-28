# 🚀 Lambda Framework

Framework reutilizável para criação de handlers AWS Lambda com TypeScript, implementando padrões de projeto para máxima reutilização e manutenibilidade.

## ✨ Características

- 🎯 **Extremamente Simples**: Desenvolvedores focam apenas na lógica de negócio
- 🔧 **Multi-Trigger**: Suporte completo a API Gateway, SNS e SQS
- 🛡️ **Type Safety**: TypeScript completo com validação automática
- 🏗️ **Padrões de Projeto**: Template Method, Strategy e Factory Method
- ⚡ **Zero Boilerplate**: Redução de 70% no código repetitivo
- 🔄 **Reutilizável**: Copie e cole em qualquer projeto
- 🎨 **Retornos Flexíveis**: Customize completamente as respostas de sucesso e erro
- 🔧 **Tratamento de Erro Avançado**: Sistema robusto de tratamento de exceções
- 📝 **Validação Automática**: Integração com class-validator
- 🚀 **Pronto para Produção**: Logging, monitoramento e tratamento de erros

## 📦 Dependências Necessárias

### Dependências Principais
```json
{
  "dependencies": {
    "@nestjs/common": "^10.4.8",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/aws-lambda": "^8.10.149",
    "typescript": "^5.8.3"
  }
}
```

### Instalação
```bash
# Instalar dependências
npm install @nestjs/common class-transformer class-validator reflect-metadata
npm install -D @types/aws-lambda typescript

# Copiar o framework para seu projeto
cp -r lambda-framework/ seu-projeto/
```

## 🏗️ Arquitetura

### Padrões Implementados

- **Template Method**: `LambdaBaseLambdaHandler` define o fluxo de execução
- **Strategy**: Diferentes estratégias de parsing para cada tipo de evento
- **Factory Method**: Criação simplificada de handlers especializados

### Estrutura Completa

```
lambda-framework/
├── src/
│   ├── abstracts/                    # Classes abstratas base
│   │   ├── base-lambda-handler.abstract.ts          # Handler base genérico
│   │   ├── api-gateway-lambda-handler.abstract.ts   # Handler para API Gateway
│   │   ├── sns-lambda-handler.abstract.ts           # Handler para SNS
│   │   └── sqs-lambda-handler.abstract.ts           # Handler para SQS
│   ├── factories/                    # Factories para criação de handlers
│   │   ├── api-gateway-lambda-handler.factory.ts
│   │   ├── sns-lambda-handler.factory.ts
│   │   └── sqs-lambda-handler.factory.ts
│   ├── strategies/                   # Estratégias de parsing de eventos
│   │   ├── api-gateway-parsing.strategy.ts
│   │   ├── sns-parsing.strategy.ts
│   │   └── sqs-parsing.strategy.ts
│   ├── interfaces/                   # Interfaces e contratos
│   │   ├── exception.interface.ts
│   │   ├── http-response.interface.ts
│   │   └── lambda-event.interface.ts
│   ├── types/                       # Definições de tipos
│   │   └── validation.type.ts
│   ├── utils/                       # Utilitários
│   │   ├── dto.util.ts
│   │   └── validation.util.ts
│   ├── error-handling/              # Tratamento de erros
│   │   └── http-field-error-handling.ts
│   ├── exceptions/                  # Exceções customizadas
│   │   ├── http.exception.ts
│   │   └── http-field-validation.exception.ts
│   ├── examples/                    # Exemplos de uso
│   │   ├── api-gateway-example.ts
│   │   ├── api-gateway-custom-response-example.ts
│   │   └── sns-flexible-response-example.ts
│   └── index.ts                     # Exports centralizados
└── README.md                        # Esta documentação
```

## 🚀 Guia de Uso

### 1. API Gateway Handler (Básico)

```typescript
import { LambdaApiGatewayHandler, LambdaApiGatewayHandlerFactory } from './lambda-framework';
import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

// 1. Defina seu DTO com validações
class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  age: number;
}

// 2. Defina sua resposta
interface UserResponse {
  id: string;
  name: string;
  email: string;
  isAdult: boolean;
}

// 3. Implemente seu handler
class CreateUserHandler extends LambdaApiGatewayHandler<CreateUserDto, UserResponse> {
  protected dtoClass = CreateUserDto;

  protected async handleBusinessLogic(dto: CreateUserDto): Promise<UserResponse> {
    // Sua lógica de negócio aqui
    const userId = `user_${Date.now()}`;

    return {
      id: userId,
      name: dto.name,
      email: dto.email,
      isAdult: dto.age >= 18
    };
  }
}

// 4. Exporte o handler
export const createUserHandler = LambdaApiGatewayHandlerFactory.createHandlerFromClass(CreateUserHandler);
```

### 2. API Gateway Handler (Avançado com Customização)

```typescript
import { HttpStatus } from '@nestjs/common';
import { LambdaApiGatewayHandler, LambdaApiGatewayHandlerFactory } from './lambda-framework';

// Resposta customizada de sucesso
interface CustomSuccessResponse {
  statusCode: number;
  body: {
    success: boolean;
    data: any;
    metadata: {
      timestamp: string;
      version: string;
    };
  };
  headers: {
    'Content-Type': string;
    'X-API-Version': string;
  };
}

// Resposta customizada de erro
interface CustomErrorResponse {
  statusCode: number;
  body: {
    error: true;
    message: string;
    code: string;
    details?: any;
  };
}

class AdvancedApiHandler extends LambdaApiGatewayHandler<
  CreateUserDto,
  CustomSuccessResponse,
  CustomErrorResponse
> {
  protected dtoClass = CreateUserDto;

  protected async handleBusinessLogic(dto: CreateUserDto): Promise<CustomSuccessResponse> {
    // Validação customizada
    if (dto.age < 0) {
      throw new Error('INVALID_AGE');
    }

    const userData = {
      id: `user_${Date.now()}`,
      name: dto.name.toUpperCase(),
      email: dto.email.toLowerCase(),
      isAdult: dto.age >= 18
    };

    return {
      statusCode: HttpStatus.CREATED,
      body: {
        success: true,
        data: userData,
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': '1.0'
      }
    };
  }

  // Tratamento customizado de erros
  protected handleError(error: unknown): CustomErrorResponse {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let code = 'INTERNAL_ERROR';

    if (error instanceof Error) {
      if (error.message === 'INVALID_AGE') {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Idade deve ser maior ou igual a zero';
        code = 'INVALID_AGE';
      }
    }

    return {
      statusCode,
      body: {
        error: true,
        message,
        code
      }
    };
  }
}

export const advancedHandler = LambdaApiGatewayHandlerFactory.createHandlerFromClass(AdvancedApiHandler);
```

### 3. SNS Handler

```typescript
import { SnsLambdaHandler, SnsLambdaHandlerFactory } from './lambda-framework';

class NotificationDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  metadata?: Record<string, any>;
}

class ProcessNotificationHandler extends SnsLambdaHandler<NotificationDto, string> {
  protected dtoClass = NotificationDto;

  protected async handleBusinessLogic(dto: NotificationDto): Promise<string> {
    // Processa notificação SNS
    console.log(`Processando notificação para usuário ${dto.userId}`);
    console.log(`Mensagem: ${dto.message}`);

    // Sua lógica de processamento aqui
    await this.sendEmailNotification(dto);
    await this.updateUserPreferences(dto.userId);

    return `Notificação processada para usuário ${dto.userId}`;
  }

  private async sendEmailNotification(dto: NotificationDto): Promise<void> {
    // Implementar envio de email
  }

  private async updateUserPreferences(userId: string): Promise<void> {
    // Implementar atualização de preferências
  }
}

export const notificationHandler = SnsLambdaHandlerFactory.createHandlerFromClass(ProcessNotificationHandler);
```

### 4. SQS Handler

```typescript
import { SqsLambdaHandler, SqsLambdaHandlerFactory } from './lambda-framework';

class OrderDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @IsNumber()
  @Min(0)
  totalAmount: number;
}

class OrderItem {
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

class ProcessOrderHandler extends SqsLambdaHandler<OrderDto, string> {
  protected dtoClass = OrderDto;

  protected async handleBusinessLogic(dto: OrderDto): Promise<string> {
    // Processa pedido da fila SQS
    console.log(`Processando pedido ${dto.orderId} do cliente ${dto.customerId}`);

    // Validar estoque
    await this.validateInventory(dto.items);

    // Processar pagamento
    await this.processPayment(dto.customerId, dto.totalAmount);

    // Atualizar estoque
    await this.updateInventory(dto.items);

    // Enviar confirmação
    await this.sendOrderConfirmation(dto.orderId, dto.customerId);

    return `Pedido ${dto.orderId} processado com sucesso`;
  }

  private async validateInventory(items: OrderItem[]): Promise<void> {
    // Implementar validação de estoque
  }

  private async processPayment(customerId: string, amount: number): Promise<void> {
    // Implementar processamento de pagamento
  }

  private async updateInventory(items: OrderItem[]): Promise<void> {
    // Implementar atualização de estoque
  }

  private async sendOrderConfirmation(orderId: string, customerId: string): Promise<void> {
    // Implementar envio de confirmação
  }
}

export const orderHandler = SqsLambdaHandlerFactory.createHandlerFromClass(ProcessOrderHandler);
```

## 📋 Regras e Convenções

### 1. Estrutura de Classes

```typescript
class MeuHandler extends LambdaApiGatewayHandler<MeuDto, MinhaResposta> {
  // ✅ OBRIGATÓRIO: Definir a classe do DTO
  protected dtoClass = MeuDto;

  // ✅ OBRIGATÓRIO: Implementar a lógica de negócio
  protected async handleBusinessLogic(dto: MeuDto): Promise<MinhaResposta> {
    // Sua lógica aqui
  }

  // ✅ OPCIONAL: Customizar tratamento de erros
  protected handleError(error: unknown): MinhaRespostaErro {
    // Seu tratamento customizado
  }

  // ✅ OPCIONAL: Customizar status code de sucesso (apenas API Gateway)
  protected getSuccessStatusCode(): HttpStatus {
    return HttpStatus.CREATED; // 201
  }
}
```

### 2. DTOs com Validação

```typescript
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class MeuDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @IsNumber({}, { message: 'Idade deve ser um número' })
  @Min(0, { message: 'Idade deve ser maior ou igual a 0' })
  @Max(120, { message: 'Idade deve ser menor ou igual a 120' })
  age: number;

  @IsOptional()
  @Type(() => Date)
  birthDate?: Date;
}
```

### 3. Tratamento de Erros

```typescript
// ✅ Erro customizado
class BusinessError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'BusinessError';
  }
}

// ✅ Tratamento no handler
protected handleError(error: unknown): CustomErrorResponse {
  if (error instanceof BusinessError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: {
        error: true,
        message: error.message,
        code: error.code
      }
    };
  }

  // Fallback para erros não tratados
  return super.handleError(error);
}
```

### 4. Configuração no Serverless Framework

```yaml
# serverless.yml
functions:
  createUser:
    handler: src/handlers/create-user.createUserHandler
    events:
      - http:
          path: /users
          method: post
          cors: true

  processNotification:
    handler: src/handlers/notification.notificationHandler
    events:
      - sns:
          arn: arn:aws:sns:us-east-1:123456789012:notifications
          topicName: notifications

  processOrder:
    handler: src/handlers/order.orderHandler
    events:
      - sqs:
          arn: arn:aws:sqs:us-east-1:123456789012:orders
          batchSize: 10
```

## 🎯 Benefícios Comparativos

### Antes (Código Tradicional)
```typescript
// 35+ linhas com parsing manual, validação, tratamento de erro
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    // Parse manual do body
    const body = JSON.parse(event.body || '{}');

    // Conversão para DTO
    const dto = plainToInstance(CreateUserDto, body);

    // Validação manual
    const errors = await validate(dto);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Validation failed',
          errors: errors.map(e => Object.values(e.constraints || {})).flat()
        })
      };
    }

    // Lógica de negócio
    const result = await createUser(dto);

    // Resposta manual
    return {
      statusCode: 201,
      body: JSON.stringify(result)
    };
  } catch (error) {
    // Tratamento manual de erro
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
}
```

### Depois (Com Framework)
```typescript
// 8 linhas - apenas lógica de negócio
class CreateUserHandler extends LambdaApiGatewayHandler<CreateUserDto, UserResponse> {
  protected dtoClass = CreateUserDto;

  protected async handleBusinessLogic(dto: CreateUserDto): Promise<UserResponse> {
    return await createUser(dto);
  }
}

export const handler = LambdaApiGatewayHandlerFactory.createHandlerFromClass(CreateUserHandler);
```

## 🔧 Funcionalidades Automáticas

- ✅ **Parsing de Eventos**: Automático para API Gateway, SNS e SQS
- ✅ **Validação de DTO**: Usando class-validator com mensagens customizadas
- ✅ **Tratamento de Erros**: Centralizado e padronizado (customizável)
- ✅ **Resposta HTTP**: Formatação automática (customizável)
- ✅ **Type Safety**: Verificação completa em tempo de compilação
- ✅ **Logging**: Erros automaticamente logados com contexto
- ✅ **Headers**: Suporte completo a headers customizados
- ✅ **Status Codes**: Configuração flexível de códigos HTTP
- ✅ **Compatibilidade**: 100% compatível com código existente

## 🧪 Testes

### Exemplo de Teste Unitário

```typescript
import { CreateUserHandler } from './create-user.handler';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;

  beforeEach(() => {
    handler = new CreateUserHandler();
  });

  it('deve criar usuário com sucesso', async () => {
    const dto = {
      name: 'João Silva',
      email: 'joao@email.com',
      age: 30
    };

    const result = await handler.handleBusinessLogic(dto);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'João Silva',
      email: 'joao@email.com',
      isAdult: true
    });
  });

  it('deve tratar erro de validação', async () => {
    const invalidDto = {
      name: '',
      email: 'email-inválido',
      age: -1
    };

    // Teste com evento mock da API Gateway
    const mockEvent = {
      body: JSON.stringify(invalidDto),
      headers: {},
      pathParameters: null,
      queryStringParameters: null
    };

    const result = await handler.execute(mockEvent);

    expect(result.statusCode).toBe(400);
  });
});
```

## 🤝 Contribuição e Melhores Práticas

### Regras de Desenvolvimento

1. **Mantenha a lógica de negócio no método `handleBusinessLogic()`**
2. **Use nomes descritivos para classes e DTOs**
3. **Documente métodos customizados**
4. **Siga os padrões estabelecidos**
5. **Implemente testes unitários**
6. **Use validações robustas nos DTOs**

### Estrutura de Projeto Recomendada

```
src/
├── handlers/
│   ├── users/
│   │   ├── create-user.handler.ts
│   │   ├── update-user.handler.ts
│   │   └── delete-user.handler.ts
│   └── orders/
│       ├── create-order.handler.ts
│       └── process-order.handler.ts
├── dtos/
│   ├── user.dto.ts
│   └── order.dto.ts
├── services/
│   ├── user.service.ts
│   └── order.service.ts
└── lambda-framework/
    └── src/
        └── ...
```

## 📄 Licença

Este framework é de uso livre para projetos internos.

---

**Desenvolvido com ❤️ para simplificar o desenvolvimento de AWS Lambda com TypeScript**
