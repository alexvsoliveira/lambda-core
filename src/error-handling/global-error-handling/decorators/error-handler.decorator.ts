import { ErrorHandlerConfig } from '../interfaces/error-handler-decorator.interface';
import { ErrorHandlerRegistration } from '../interfaces/error-handler-registration.interface';
import { GlobalErrorHandler } from '../interfaces/global-error-handler.interface';
import { GlobalErrorHandlerRegistry } from '../registry/global-error-handler-registry';

export function ErrorHandler(config: ErrorHandlerConfig = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T extends new (...args: any[]) => GlobalErrorHandler>(constructor: T): T {
    const registration: ErrorHandlerRegistration = {
      errorTypes: config.errorTypes,
      handlerTypes: config.handlerTypes,
      enabled: config.enabled ?? true,
    };

    if (registration.enabled) {
      const instance = new constructor();
      GlobalErrorHandlerRegistry.getInstance().register(registration, instance);
    }

    return constructor;
  };
}
