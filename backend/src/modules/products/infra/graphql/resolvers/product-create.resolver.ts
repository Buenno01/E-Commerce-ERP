import { ProductCreateUseCase } from "@products/application/use-cases/product-create.use-case";

export default function productCreate(_: any, { input }: any, context: any) {
  const useCase = context.container.resolve(ProductCreateUseCase);
  return useCase.execute(input);
}
