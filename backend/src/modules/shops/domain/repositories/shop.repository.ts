import { ShopEntity } from "../entities/shop.entity";

export interface ShopRepository {
  save(shop: ShopEntity): Promise<void>;
}
