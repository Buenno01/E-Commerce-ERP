import { NameVO } from "@/shared/domain/value-objects/name.vo";
import { ShopEntity } from "../../domain/entities/shop.entity";
import { ShopRepository } from "../../domain/repositories/shop.repository";
import { ShopCreateDTO } from "../dtos/shop-create.dto";
import { SlugVO } from "@/shared/domain/value-objects/slug.vo";

export class ShopCreateUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute({ name, slug, ownerId }: ShopCreateDTO) {
    const shopEntity = ShopEntity.create({
      ownerId: ownerId,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: new NameVO(name),
      slug: new SlugVO(slug ?? name),
    });

    await this.shopRepository.save(shopEntity);

    return shopEntity;
  }
}
