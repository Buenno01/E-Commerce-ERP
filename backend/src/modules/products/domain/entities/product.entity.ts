import { MoneyVO } from "../value-objects/money.vo";
import { ProductNameVO } from "../value-objects/product-name.vo";
import { SkuVO } from "../value-objects/sku.vo";
import { SlugVO } from "../value-objects/slug.vo";

export class ProductEntity {
    constructor(
        public readonly id: string,
        public name: ProductNameVO,
        public slug: SlugVO,
        public description: string,
        public price: MoneyVO,
        public quantity: number,
        public createdAt: Date,
        public updatedAt: Date,
        public sku: SkuVO,
    ) {}
}