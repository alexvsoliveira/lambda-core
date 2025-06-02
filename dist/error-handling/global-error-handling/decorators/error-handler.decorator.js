"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = ErrorHandler;
const global_error_handler_registry_1 = require("../registry/global-error-handler-registry");
function ErrorHandler(config = {}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (constructor) {
        var _a;
        const registration = {
            errorTypes: config.errorTypes,
            handlerTypes: config.handlerTypes,
            enabled: (_a = config.enabled) !== null && _a !== void 0 ? _a : true,
        };
        if (registration.enabled) {
            const instance = new constructor();
            global_error_handler_registry_1.GlobalErrorHandlerRegistry.getInstance().register(registration, instance);
        }
        return constructor;
    };
}
