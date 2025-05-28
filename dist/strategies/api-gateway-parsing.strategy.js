"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayParsingStrategy = void 0;
class ApiGatewayParsingStrategy {
    static parseBody(event) {
        var _a;
        try {
            return JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : '{}');
        }
        catch (err) {
            console.log(err);
            throw new Error('Invalid JSON body');
        }
    }
}
exports.ApiGatewayParsingStrategy = ApiGatewayParsingStrategy;
