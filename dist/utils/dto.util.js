"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToDto = transformToDto;
const class_transformer_1 = require("class-transformer");
function transformToDto(dtoClass, input) {
    return (0, class_transformer_1.plainToInstance)(dtoClass, input);
}
