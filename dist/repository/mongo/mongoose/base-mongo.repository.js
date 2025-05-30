"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMongoRepository = void 0;
class BaseMongoRepository {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.find();
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async create(data) {
        return new this.model(data).save();
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        return result != null;
    }
}
exports.BaseMongoRepository = BaseMongoRepository;
