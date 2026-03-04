import { ShopEntity } from "@/modules/shops/domain/entities/shop.entity";
import { ShopRepository } from "@/modules/shops/domain/repositories/shop.repository";
import { PrismaClient } from "@prisma-generated/client";
import { ShopMapper } from "../../mappers/shop.mapper";

export class PrismaShopRepository implements ShopRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(shop: ShopEntity): Promise<void> {
    console.log(JSON.stringify(shop));

    const raw = ShopMapper.toPersistence(shop);

    await this.prisma.shop.create({
      data: raw,
    });

    return;
  }
}
