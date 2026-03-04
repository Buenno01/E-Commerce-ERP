import { NameVO } from "@/shared/domain/value-objects/name.vo";
import { ShopEntity } from "../../domain/entities/shop.entity";
import { SlugVO } from "@/shared/domain/value-objects/slug.vo";
import { shop as PrismaShop } from "@prisma-generated/client";

export class ShopMapper {
  static toDomain(raw: PrismaShop): ShopEntity {
    return ShopEntity.create({
      ownerId: raw.ownerId,
      id: raw.id,
      name: new NameVO(raw.name),
      slug: new SlugVO(raw.slug),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(shop: ShopEntity): PrismaShop {
    return {
      ownerId: shop.ownerId,
      id: shop.id,
      name: shop.name.value,
      slug: shop.slug.value,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
  }
}
