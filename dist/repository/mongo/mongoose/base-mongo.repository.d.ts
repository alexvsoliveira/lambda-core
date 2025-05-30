import { Document, Model } from 'mongoose';
export declare class BaseMongoRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T | Document>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
