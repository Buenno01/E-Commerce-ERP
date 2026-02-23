import { ProductEntity } from "@products/domain/entities/product.entity";
import { ProductRepositoryInterface } from "@products/domain/repositories/product.repository";

export class ProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string): Promise<ProductEntity | null> {
    return await this.productRepository.findById(id);
  }
}
