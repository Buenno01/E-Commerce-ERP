import { ProductRepositoryInterface } from "@products/domain/repositories/product.repository";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ConnectionUseCaseInterface } from "@/infra/graphql/schema/connection.type";

type ProductConnectionType = ConnectionUseCaseInterface<ProductEntity>;

export class ProductsQueryUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(query: string): Promise<ProductConnectionType> {
    const nodes = await this.productRepository.findAll(query);
    return {
      nodes,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}
