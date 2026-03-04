import { ShopCreateUseCase } from "@/modules/shops/application/use-cases/shop-create.use-case";

export default function shopCreate(_: any, { input }: any, context: any) {
  const useCase = context.container.resolve(ShopCreateUseCase);
  return useCase.execute(input);
}
