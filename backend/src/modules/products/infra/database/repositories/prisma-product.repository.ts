import { Filter, IntFilter, StringFilter } from "@/infra/database/filter";
import { processFilter } from "@/infra/database/filter-processor";
import { Prisma, PrismaClient } from "@prisma-generated/client";
import { ProductEntity } from "@products/domain/entities/product.entity";
import {
  ProductFilter,
  ProductRepositoryInterface,
} from "@products/domain/repositories/product.repository";
import { ProductMapper } from "@products/infra/mappers/product-mapper.mapper";

type ProductFilterFields = {
  name: StringFilter;
  sku: StringFilter;
  price: IntFilter;
};

const processProductFilter = processFilter<
  ProductFilterFields,
  Prisma.productWhereInput
>({
  name: (f) => ({
    name: {
      equals: f.equals,
      contains: f.contains,
      startsWith: f.startsWith,
      mode: "insensitive",
    },
  }),
  sku: (f) => ({
    sku: {
      equals: f.equals,
      contains: f.contains,
      startsWith: f.startsWith,
      mode: "insensitive",
    },
  }),
  price: (f) => ({
    priceAmount: {
      equals: f.equals,
      gte: f.gte,
      lte: f.lte,
      gt: f.gt,
      lt: f.lt,
    },
  }),
});

export class PrismaProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async save(product: ProductEntity) {
    await this.prisma.product.create({
      data: ProductMapper.toPersistence(product),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async update(product: ProductEntity) {
    await this.prisma.product.update({
      where: { id: product.id },
      data: ProductMapper.toPersistence(product),
    });
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!raw) return null;

    return ProductMapper.toDomain(raw);
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    const raw = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (!raw) return null;

    return ProductMapper.toDomain(raw);
  }

  async findAll(filters?: ProductFilter): Promise<ProductEntity[]> {
    const where = processProductFilter(filters as Filter<ProductFilterFields>);

    const raws = await this.prisma.product.findMany({ where });

    return raws.map(ProductMapper.toDomain);
  }
}
