import { ProductByIdUseCase } from "@/modules/products/application/use-cases/product-by-id.use-case";

export default function productById(_: any, { id }: any, context: any) {
  const useCase = context.container.resolve(ProductByIdUseCase);

  return useCase.execute(id);
}
