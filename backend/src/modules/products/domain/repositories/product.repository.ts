import { ProductEntity } from "../entities/product.entity";

export interface ProductRepository {
    save(product: ProductEntity): Promise<ProductEntity>;
    delete(id: string): Promise<void>;
    update(product: ProductEntity): Promise<void>;
    findById(id: string): Promise<ProductEntity | null>;
    findBySlug(slug: string): Promise<ProductEntity | null>;
    findAll(query: string): Promise<ProductEntity[]>;
}