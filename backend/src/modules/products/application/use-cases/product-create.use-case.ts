import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { MoneyVO } from "../../domain/value-objects/money.vo";
import { ProductNameVO } from "../../domain/value-objects/product-name.vo";
import { SkuVO } from "../../domain/value-objects/sku.vo";
import { SlugVO } from "../../domain/value-objects/slug.vo";
import { CreateProductDTO } from "../dtos/product-create.dto";

export class ProductCreateUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    async execute(product: CreateProductDTO): Promise<void> {
        const targetSlug = product.slug ? product.slug : product.name;
        const slug = await this.createSlug(targetSlug);
        const productEntity = new ProductEntity(
            crypto.randomUUID(),
            new ProductNameVO(product.name),
            slug,
            product.description ?? '',
            new MoneyVO(product.price.amount, product.price.currency),
            product.quantity ?? 0,
            new Date(),
            new Date(),
            new SkuVO(product.sku ?? ''),
        );
        await this.productRepository.save(productEntity);
    }

    private async createSlug(value: string): Promise<SlugVO> {
        const baseSlug = SlugVO.fromString(value);
        let slug = baseSlug;
        let i = 1;

        while (await this.productRepository.findBySlug(slug.value)) {
            slug = new SlugVO(`${baseSlug.value}-${i}`);
            i++;
        }

        return slug;
    }
}