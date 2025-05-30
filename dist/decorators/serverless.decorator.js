"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serverless = exports.SERVERLESS_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.SERVERLESS_METADATA = 'serverless';
const Serverless = (config) => (0, common_1.SetMetadata)(exports.SERVERLESS_METADATA, config);
exports.Serverless = Serverless;
