"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandlerRegistry = void 0;
/**
 * Registry central para Global Error Handlers
 *
 * Gerencia o registro e busca de error handlers usando singleton pattern.
 * Implementa lógica de prioridade: handlers específicos antes de globais.
 */
class GlobalErrorHandlerRegistry {
    /**
     * Construtor privado para singleton pattern
     */
    constructor() {
        this.handlers = new Map();
    }
    static getInstance() {
        if (!GlobalErrorHandlerRegistry.instance) {
            GlobalErrorHandlerRegistry.instance = new GlobalErrorHandlerRegistry();
        }
        return GlobalErrorHandlerRegistry.instance;
    }
    register(config, handler) {
        var _a;
        const key = this.createKey(config.errorTypes, config.handlerTypes);
        if (this.handlers.has(key)) {
            const errorTypesNames = ((_a = config.errorTypes) === null || _a === void 0 ? void 0 : _a.map((t) => t.name).join(', ')) || 'All';
            throw new Error(`Handler already registered for error types: ${errorTypesNames}`);
        }
        handler._setErrorTypes(config.errorTypes || []);
        this.handlers.set(key, handler);
    }
    getHandler(error, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass) {
        const handlers = [];
        for (const [key, handler] of this.handlers) {
            if (this.keyMatchesHandler(key, handlerClass) && handler.canHandle(error)) {
                handlers.push(handler);
            }
            if (this.keyMatchesGlobal(key) && handler.canHandle(error)) {
                handlers.push(handler);
            }
        }
        return handlers;
    }
    getRegisteredHandlers() {
        return Array.from(this.handlers.entries()).map(([key, handler]) => ({
            key,
            handlerName: handler.name,
        }));
    }
    createKey(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorTypes, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerTypes) {
        const errorTypesNames = (errorTypes === null || errorTypes === void 0 ? void 0 : errorTypes.map((t) => t.name).sort().join(',')) || '*';
        const handlerTypesNames = (handlerTypes === null || handlerTypes === void 0 ? void 0 : handlerTypes.map((h) => h.name).sort().join(',')) || '*';
        return `${errorTypesNames}:${handlerTypesNames}`;
    }
    keyMatchesHandler(key, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass) {
        const [, handlerTypesStr] = key.split(':');
        if (handlerTypesStr === '*')
            return false; // Handler global, não específico
        const handlerTypes = handlerTypesStr.split(',');
        // Verifica se o handlerClass é uma instância ou herda de algum dos handlerTypes
        return handlerTypes.some((handlerTypeName) => this.isInstanceOf(handlerClass, handlerTypeName));
    }
    /**
     * Verifica se uma classe é uma instância ou herda de uma classe pai específica
     */
    isInstanceOf(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlerClass, targetClassName) {
        // Verifica se o nome da classe atual corresponde
        if (handlerClass.name === targetClassName) {
            return true;
        }
        // Verifica a cadeia de herança
        let currentClass = Object.getPrototypeOf(handlerClass);
        while (currentClass && currentClass.name !== 'Function') {
            if (currentClass.name === targetClassName) {
                return true;
            }
            currentClass = Object.getPrototypeOf(currentClass);
        }
        return false;
    }
    keyMatchesGlobal(key) {
        const [, handlerTypesStr] = key.split(':');
        return handlerTypesStr === '*'; // Apenas handlers globais
    }
}
exports.GlobalErrorHandlerRegistry = GlobalErrorHandlerRegistry;
