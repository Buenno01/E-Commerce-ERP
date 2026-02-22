import { PrismaClient } from "@prisma-generated/client";
import { ProductEntity } from "@products/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@products/domain/repositories/product.repository";
import { ProductMapper } from "@products/infra/mappers/product-mapper.mapper";

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

  async findAll(query?: string): Promise<ProductEntity[]> {
    if (query) {
      console.warn("Query string not implemented", query);
    }

    const raws = await this.prisma.product.findMany();

    return raws.map(ProductMapper.toDomain);
  }
}
