import { ProductEntity } from "@products/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@products/domain/repositories/product.repository";
import { MoneyVO } from "@products/domain/value-objects/money.vo";
import { ProductNameVO } from "@products/domain/value-objects/product-name.vo";
import { SkuVO } from "@products/domain/value-objects/sku.vo";
import { SlugVO } from "@products/domain/value-objects/slug.vo";
import { CreateProductDTO } from "../dtos/product-create.dto";

export class ProductCreateUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(product: CreateProductDTO): Promise<void> {
    const targetSlug = product.slug ? product.slug : product.name;

    const productEntity = ProductEntity.create({
      id: crypto.randomUUID(),
      name: new ProductNameVO(product.name),
      slug: await this.createSlug(targetSlug),
      description: product.description ?? null,
      price: new MoneyVO(product.price.amount, product.price.currencyCode),
      quantity: product.quantity ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      sku: new SkuVO(product.sku ?? ""),
    });

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
