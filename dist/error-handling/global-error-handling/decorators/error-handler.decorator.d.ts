import { ErrorHandlerConfig } from '../interfaces/error-handler-decorator.interface';
import { GlobalErrorHandler } from '../interfaces/global-error-handler.interface';
export declare function ErrorHandler(config?: ErrorHandlerConfig): <T extends new (...args: any[]) => GlobalErrorHandler>(constructor: T) => T;
