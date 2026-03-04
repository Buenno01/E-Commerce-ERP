import { ShopCreateUseCase } from "@/modules/shops/application/use-cases/shop-create.use-case";

export default function shopCreate(_: any, { input }: any, context: any) {
  if (!context.user) {
    throw new Error(
      "Forbidden: you must be authenticated in order to create a Shop",
    );
  }
  const useCase = context.container.resolve(ShopCreateUseCase);
  return useCase.execute({ ...input, ownerId: context.user.sub });
}
