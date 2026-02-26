import { ProductsQueryUseCase } from "@/modules/products/application/use-cases/products-query.use-case";

export default function productsQuery(
  _: any,
  { filters, first, before, after }: any,
  context: any,
) {
  const useCase = context.container.resolve(ProductsQueryUseCase);

  return useCase.execute(filters, first, before, after);
}
