"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaBaseLambdaHandler = void 0;
const global_error_handler_registry_1 = require("../error-handling/global-error-handling/registry/global-error-handler-registry");
class LambdaBaseLambdaHandler {
    async execute(event) {
        try {
            const dto = this.parseDto(event);
            return await this.handleBusinessLogic(dto);
        }
        catch (error) {
            return this.handleError(error, event);
        }
    }
    handleError(error, event) {
        this.handleErrorWithGlobal(error, event);
        return this.handleErrorResponse(error);
    }
    handleErrorResponse(error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return error;
    }
    handleErrorWithGlobal(error, event) {
        const context = {
            originalEvent: event,
            handlerName: this.constructor.name,
            timestamp: new Date(),
            metadata: this.extractMetadata(error, event),
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalHandlers = global_error_handler_registry_1.GlobalErrorHandlerRegistry.getInstance().getHandler(error, this.constructor);
        if (globalHandlers) {
            for (const globalHandler of globalHandlers) {
                globalHandler.handle(error, context);
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    extractMetadata(_error, _event) {
        return {};
    }
    parseDto(event) {
        if (!this.parsingStrategy.canHandle(event)) {
            throw new Error('Event type not supported by the parsing strategy');
        }
        return this.parsingStrategy.parseEventToDto(event, this.dtoClass);
    }
}
exports.LambdaBaseLambdaHandler = LambdaBaseLambdaHandler;
