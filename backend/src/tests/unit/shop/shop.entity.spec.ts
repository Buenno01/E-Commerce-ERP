import { describe, expect, test } from "vitest";

import { ShopEntity } from "@shops/domain/entities/shop.entity";
import { NameVO } from "@/shared/domain/value-objects/name.vo";
import { SlugVO } from "@/shared/domain/value-objects/slug.vo";

const makeShop = (overrides?: Partial<{ name: NameVO; slug: SlugVO }>) =>
  ShopEntity.create({
    ownerId: "123e4567-e89b-12d3-a456-426614174000",
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: new NameVO("My Shop"),
    slug: new SlugVO("my-shop"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    ...overrides,
  });

describe("SHOPS:ENTITY ShopEntity", () => {
  describe("ShopEntity.create()", () => {
    test("should create a valid shop entity", () => {
      const shop = makeShop();
      expect(shop).toBeInstanceOf(ShopEntity);
    });
  });

  describe("id (getter)", () => {
    test("should return the correct id", () => {
      const shop = makeShop();
      expect(shop.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
  });

  describe("name (getter)", () => {
    test("should return a NameVO instance", () => {
      const shop = makeShop();
      expect(shop.name).toBeInstanceOf(NameVO);
    });

    test("should return the correct name value", () => {
      const shop = makeShop({ name: new NameVO("Cool Store") });
      expect(shop.name.value).toBe("Cool Store");
    });
  });

  describe("slug (getter)", () => {
    test("should return a SlugVO instance", () => {
      const shop = makeShop();
      expect(shop.slug).toBeInstanceOf(SlugVO);
    });

    test("should return the correct slug value", () => {
      const shop = makeShop({ slug: new SlugVO("cool-store") });
      expect(shop.slug.value).toBe("cool-store");
    });
  });

  describe("createdAt (getter)", () => {
    test("should return the correct createdAt date", () => {
      const createdAt = new Date("2024-01-01");
      const shop = makeShop();
      expect(shop.createdAt).toEqual(createdAt);
    });
  });

  describe("updatedAt (getter)", () => {
    test("should return the correct updatedAt date", () => {
      const updatedAt = new Date("2024-06-01");
      const shop = ShopEntity.create({
        ownerId: "123e4567-e89b-12d3-a456-426614174000",
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: new NameVO("My Shop"),
        slug: new SlugVO("my-shop"),
        createdAt: new Date("2024-01-01"),
        updatedAt,
      });
      expect(shop.updatedAt).toEqual(updatedAt);
    });
  });
});
