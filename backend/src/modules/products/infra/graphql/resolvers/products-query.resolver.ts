import { ProductsQueryUseCase } from "@/modules/products/application/use-cases/products-query.use-case";

export default function productsQuery(_: any, { input }: any, context: any) {
  const useCase = context.container.resolve(ProductsQueryUseCase);
  return useCase.execute();
}
