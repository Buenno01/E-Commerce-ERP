import {
  ProductFilter,
  ProductRepositoryInterface,
} from "@products/domain/repositories/product.repository";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ConnectionUseCaseInterface } from "@/infra/graphql/schema/connection.type";
import * as cursor from "@/lib/cursor";

type ProductConnectionType = ConnectionUseCaseInterface<ProductEntity>;

export class ProductsQueryUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(
    filters: ProductFilter,
    first: number,
    before: string,
    after: string,
  ): Promise<ProductConnectionType> {
    const hasAnyCursor = after || before;
    const fromProductId = hasAnyCursor
      ? cursor.decode(after || before)
      : undefined;

    const takeIsPositive = (!after && !before) || !!after;
    const take = takeIsPositive ? first : -1 * first;

    const nodes = await this.productRepository.findAll(
      take > 0 ? take + 2 : take - 2,
      filters,
      fromProductId,
    );

    nodes.shift();

    const hasExtraItem = nodes.length > first;

    if (hasExtraItem) nodes.pop();

    return {
      nodes,
      hasNextPage: takeIsPositive ? hasExtraItem : false,
      hasPreviousPage: !takeIsPositive ? hasExtraItem : false,
    };
  }
}
