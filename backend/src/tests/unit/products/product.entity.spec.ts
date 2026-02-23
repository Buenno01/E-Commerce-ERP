import { describe, it, expect } from "vitest";
import { ProductEntity } from "@products/domain/entities/product.entity";
import { MoneyVO } from "@products/domain/value-objects/money.vo";
import { ProductNameVO } from "@products/domain/value-objects/product-name.vo";
import { SkuVO } from "@products/domain/value-objects/sku.vo";
import { SlugVO } from "@products/domain/value-objects/slug.vo";

const makeProduct = (
  overrides?: Partial<Parameters<typeof ProductEntity.create>[0]>,
) => {
  return ProductEntity.create({
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: new ProductNameVO("Test Product"),
    slug: new SlugVO("test-product"),
    description: "A test product",
    price: new MoneyVO(1000, "BRL"),
    quantity: 10,
    sku: new SkuVO("TEST-SKU-001"),
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    ...overrides,
  });
};

describe("PRODUCTS:ENTITY ProductEntity", () => {
  describe("create", () => {
    it("should create a product with all required props", () => {
      const product = makeProduct();

      expect(product.id).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(product.name).toBeInstanceOf(ProductNameVO);
      expect(product.name.value).toBe("Test Product");
      expect(product.slug).toBeInstanceOf(SlugVO);
      expect(product.slug.value).toBe("test-product");
      expect(product.description).toBe("A test product");
      expect(product.price).toBeInstanceOf(MoneyVO);
      expect(product.quantity).toBe(10);
      expect(product.sku).toBeInstanceOf(SkuVO);
      expect(product.createdAt).toBeInstanceOf(Date);
      expect(product.updatedAt).toBeInstanceOf(Date);
    });

    it("should create a product with null description", () => {
      const product = makeProduct({ description: null });

      expect(product.description).toBeNull();
    });

    it("should create a product with zero quantity", () => {
      const product = makeProduct({ quantity: 0 });

      expect(product.quantity).toBe(0);
    });

    it("should preserve the exact id provided", () => {
      const id = "custom-id-abc-123";
      const product = makeProduct({ id });

      expect(product.id).toBe(id);
    });

    it("should preserve createdAt and updatedAt dates", () => {
      const createdAt = new Date("2023-06-15T10:00:00.000Z");
      const updatedAt = new Date("2023-07-20T15:30:00.000Z");
      const product = makeProduct({ createdAt, updatedAt });

      expect(product.createdAt).toEqual(createdAt);
      expect(product.updatedAt).toEqual(updatedAt);
    });
  });

  describe("getters", () => {
    it("should return the correct name VO", () => {
      const name = new ProductNameVO("My Product");
      const product = makeProduct({ name });

      expect(product.name).toBe(name);
      expect(product.name.value).toBe("My Product");
    });

    it("should return the correct slug VO", () => {
      const slug = new SlugVO("my-product");
      const product = makeProduct({ slug });

      expect(product.slug).toBe(slug);
      expect(product.slug.value).toBe("my-product");
    });

    it("should return the correct price VO", () => {
      const price = new MoneyVO(5000, "USD");
      const product = makeProduct({ price });

      expect(product.price).toBe(price);
      expect(product.price.amount).toBe(5000);
      expect(product.price.currencyCode).toBe("USD");
    });

    it("should return the correct sku VO", () => {
      const sku = new SkuVO("SKU-XYZ-999");
      const product = makeProduct({ sku });

      expect(product.sku).toBe(sku);
      expect(product.sku.value).toBe("SKU-XYZ-999");
    });
  });

  describe("immutability", () => {
    it("should not allow direct modification of id", () => {
      const product = makeProduct();

      // @ts-expect-error - id is readonly
      expect(() => (product.id = "new-id")).toThrow();
    });
  });
});
