import { prisma } from "@infra/prisma";
import { PrismaProductRepository } from "@products/infra/database/repositories/prisma-product.repository";
import { ProductCreateUseCase } from "@products/application/use-cases/product-create.use-case";
import { ProductByIdUseCase } from "@products/application/use-cases/product-by-id.use-case";
import { Container } from "./container";
import { ProductsQueryUseCase } from "@/modules/products/application/use-cases/products-query.use-case";
import { AuthCodeRequestUseCase } from "@/modules/auth/application/use-cases/auth-code-request.use-case";
import { PrismaAuthCodeRepository } from "@/modules/auth/infra/database/repositories/prisma-auth-code.repository";
import { AuthCodeVerifyUseCase } from "@/modules/auth/application/use-cases/auth-code-verify.use-case";
import { PrismaUserRepository } from "@/modules/users/infra/database/repositories/prisma-user.repository";
import { ResenderEmailSenderService } from "../services/resender-email-sender.service";
import { PrismaShopRepository } from "@/modules/shops/infra/database/repositories/shop.repository";
import { ShopCreateUseCase } from "@/modules/shops/application/use-cases/shop-create.use-case";

const container = new Container();

// Prisma repositories

container.registerSingleton(
  PrismaProductRepository.name,
  () => new PrismaProductRepository(prisma),
);

container.registerSingleton(
  PrismaUserRepository.name,
  () => new PrismaUserRepository(prisma),
);

container.registerSingleton(
  PrismaAuthCodeRepository.name,
  () => new PrismaAuthCodeRepository(prisma),
);

container.registerSingleton(
  PrismaShopRepository.name,
  () => new PrismaAuthCodeRepository(prisma),
);

// Services

container.registerSingleton(
  ResenderEmailSenderService.name,
  () => new ResenderEmailSenderService(),
);

// Use cases

container.registerSingleton(
  ProductCreateUseCase.name,
  () =>
    new ProductCreateUseCase(container.resolve(PrismaProductRepository.name)),
);

container.registerSingleton(
  ProductByIdUseCase.name,
  () => new ProductByIdUseCase(container.resolve(PrismaProductRepository.name)),
);

container.registerSingleton(
  ProductsQueryUseCase.name,
  () =>
    new ProductsQueryUseCase(container.resolve(PrismaProductRepository.name)),
);

container.registerSingleton(
  AuthCodeRequestUseCase.name,
  () =>
    new AuthCodeRequestUseCase(
      container.resolve(PrismaAuthCodeRepository.name),
      container.resolve(ResenderEmailSenderService.name),
    ),
);

container.registerSingleton(
  AuthCodeVerifyUseCase.name,
  () =>
    new AuthCodeVerifyUseCase(
      container.resolve(PrismaAuthCodeRepository.name),
      container.resolve(PrismaUserRepository.name),
    ),
);

container.registerSingleton(
  ShopCreateUseCase.name,
  () => new ShopCreateUseCase(container.resolve(PrismaShopRepository.name)),
);

export { container };
