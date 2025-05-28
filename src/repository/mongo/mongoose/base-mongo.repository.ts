import {Document, Model} from 'mongoose';

export class BaseMongoRepository<T> {
    constructor(protected readonly model: Model<T>) {
    }

    async findAll(): Promise<T[]> {
        return this.model.find()
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id)
    }

    async create(data: Partial<T>): Promise<T | Document> {
        return new this.model(data).save();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return result != null;
    }
}
