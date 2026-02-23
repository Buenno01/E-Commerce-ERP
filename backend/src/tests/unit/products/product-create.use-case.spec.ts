import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductCreateUseCase } from "@products/application/use-cases/product-create.use-case";
import { ProductRepositoryInterface } from "@products/domain/repositories/product.repository";
import { ProductEntity } from "@products/domain/entities/product.entity";
import { CreateProductDTO } from "@products/application/dtos/product-create.dto";

const makeRepositoryMock = (): ProductRepositoryInterface => ({
  save: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  findById: vi.fn().mockResolvedValue(null),
  findBySlug: vi.fn().mockResolvedValue(null),
  findAll: vi.fn().mockResolvedValue([]),
});

const makeDTO = (overrides?: Partial<CreateProductDTO>): CreateProductDTO => ({
  name: "Test Product",
  price: { amount: 1000, currencyCode: "BRL" },
  sku: "TST-123456",
  description: "Lorem ipsum dolor sit amet.",
  quantity: 1,
  ...overrides,
});

describe("ProductCreateUseCase", () => {
  let repository: ProductRepositoryInterface;
  let useCase: ProductCreateUseCase;

  beforeEach(() => {
    repository = makeRepositoryMock();
    useCase = new ProductCreateUseCase(repository);
  });

  describe("execute", () => {
    it("should create and return a product entity", async () => {
      const result = await useCase.execute(makeDTO());

      expect(result).toBeInstanceOf(ProductEntity);
    });

    it("should save the product in the repository", async () => {
      await useCase.execute(makeDTO());

      expect(repository.save).toHaveBeenCalledOnce();
      expect(repository.save).toHaveBeenCalledWith(expect.any(ProductEntity));
    });

    it("should set name correctly", async () => {
      const result = await useCase.execute(makeDTO({ name: "My Product" }));

      expect(result.name.value).toBe("My Product");
    });

    it("should set price correctly", async () => {
      const result = await useCase.execute(
        makeDTO({ price: { amount: 5000, currencyCode: "USD" } }),
      );

      expect(result.price.amount).toBe(5000);
      expect(result.price.currencyCode).toBe("USD");
    });

    it("should set description when provided", async () => {
      const result = await useCase.execute(
        makeDTO({ description: "A great product" }),
      );

      expect(result.description).toBe("A great product");
    });

    it("should set description to null when not provided", async () => {
      const result = await useCase.execute(makeDTO({ description: undefined }));

      expect(result.description).toBeNull();
    });

    it("should set quantity when provided", async () => {
      const result = await useCase.execute(makeDTO({ quantity: 42 }));

      expect(result.quantity).toBe(42);
    });

    it("should default quantity to 0 when not provided", async () => {
      const result = await useCase.execute(makeDTO({ quantity: undefined }));

      expect(result.quantity).toBe(0);
    });

    it("should generate a unique id for each product", async () => {
      const first = await useCase.execute(makeDTO());
      const second = await useCase.execute(makeDTO());

      expect(first.id).not.toBe(second.id);
    });
  });

  describe("slug generation", () => {
    it("should generate slug from name when slug is not provided", async () => {
      const result = await useCase.execute(makeDTO({ name: "My Product" }));

      expect(result.slug.value).toBe("my-product");
    });

    it("should use provided slug instead of generating from name", async () => {
      const result = await useCase.execute(makeDTO({ slug: "custom-slug" }));

      expect(result.slug.value).toBe("custom-slug");
    });

    it("should append suffix when slug already exists", async () => {
      vi.mocked(repository.findBySlug)
        .mockResolvedValueOnce({} as ProductEntity) // "test-product" exists
        .mockResolvedValueOnce(null); // "test-product-1" is free

      const result = await useCase.execute(makeDTO({ name: "Test Product" }));

      expect(result.slug.value).toBe("test-product-1");
    });

    it("should increment suffix until a free slug is found", async () => {
      vi.mocked(repository.findBySlug)
        .mockResolvedValueOnce({} as ProductEntity) // "test-product" exists
        .mockResolvedValueOnce({} as ProductEntity) // "test-product-1" exists
        .mockResolvedValueOnce({} as ProductEntity) // "test-product-2" exists
        .mockResolvedValueOnce(null); // "test-product-3" is free

      const result = await useCase.execute(makeDTO({ name: "Test Product" }));

      expect(result.slug.value).toBe("test-product-3");
    });

    it("should check slug availability before saving", async () => {
      await useCase.execute(makeDTO({ name: "Test Product" }));

      expect(repository.findBySlug).toHaveBeenCalledWith("test-product");
    });
  });
});
