"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_validator_1 = require("class-validator");
async function validateDto(dto) {
    const errors = await (0, class_validator_1.validate)(dto);
    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }
}
