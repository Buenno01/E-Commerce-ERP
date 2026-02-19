import { ProductEntity } from "@products/domain/entities/product.entity";
import { product as PrismaProduct } from "@prisma-generated/client";
import { ProductNameVO } from "../../domain/value-objects/product-name.vo";
import { MoneyVO } from "../../domain/value-objects/money.vo";
import { SkuVO } from "../../domain/value-objects/sku.vo";
import { SlugVO } from "../../domain/value-objects/slug.vo";

export class ProductMapper {
  static toDomain(raw: PrismaProduct): ProductEntity {
    return ProductEntity.create({
      id: raw.id,
      createdAt: raw.createdAt,
      description: raw.description,
      name: new ProductNameVO(raw.name),
      price: new MoneyVO(raw.priceAmount, raw.priceCurrencyCode),
      quantity: raw.quantity,
      sku: new SkuVO(raw.sku),
      slug: new SlugVO(raw.slug),
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistance(product: ProductEntity): PrismaProduct {
    return {
      createdAt: product.createdAt,
      description: product.description,
      id: product.id,
      name: product.name.value,
      priceAmount: product.price.amount,
      priceCurrencyCode: product.price.currency,
      quantity: product.quantity,
      sku: product.sku.value,
      slug: product.slug.value,
      updatedAt: product.updatedAt,
    };
  }
}
