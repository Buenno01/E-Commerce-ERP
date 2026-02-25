import { ProductEntity } from "../entities/product.entity";
export type ProductFilter = {
  name?: { equals?: string; contains?: string; startsWith?: string };
  sku?: { equals?: string; contains?: string; startsWith?: string };
  price?: {
    equals?: number;
    gte?: number;
    lte?: number;
    gt?: number;
    lt?: number;
  };
  AND?: ProductFilter[];
  OR?: ProductFilter[];
  NOT?: ProductFilter;
};
export interface ProductRepositoryInterface {
  save(product: ProductEntity): Promise<void>;
  delete(id: string): Promise<void>;
  update(product: ProductEntity): Promise<void>;
  findById(id: string): Promise<ProductEntity | null>;
  findBySlug(slug: string): Promise<ProductEntity | null>;
  findAll(filters: ProductFilter): Promise<ProductEntity[]>;
}
