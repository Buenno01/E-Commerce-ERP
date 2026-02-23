import { prisma } from "@infra/prisma";
import { PrismaProductRepository } from "@products/infra/database/repositories/prisma-product.repository";
import { ProductCreateUseCase } from "@products/application/use-cases/product-create.use-case";
import { ProductByIdUseCase } from "@products/application/use-cases/product-by-id.use-case";
import { Container } from "./container";

const container = new Container();

container.registerSingleton(
  PrismaProductRepository.name,
  () => new PrismaProductRepository(prisma),
);

container.registerSingleton(
  ProductCreateUseCase.name,
  () =>
    new ProductCreateUseCase(container.resolve(PrismaProductRepository.name)),
);

container.registerSingleton(
  ProductByIdUseCase.name,
  () => new ProductByIdUseCase(container.resolve(PrismaProductRepository.name)),
);

export { container };
