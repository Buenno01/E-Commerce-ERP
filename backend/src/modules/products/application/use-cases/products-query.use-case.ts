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
    first?: number,
    before?: string,
    after?: string,
  ): Promise<ProductConnectionType> {
    const hasAnyCursor = after || before;

    const extraItems = hasAnyCursor ? 2 : 1;

    const takeMultiplier = (!after && !before) || !!after ? 1 : -1;
    const originalTake = first ?? 15;
    const totalToTake = (extraItems + originalTake) * takeMultiplier;

    const fromProductId = hasAnyCursor
      ? cursor.decode(hasAnyCursor)
      : undefined;

    const nodes = await this.productRepository.findAll(
      totalToTake,
      filters,
      fromProductId,
    );

    if (after) {
      nodes.shift();
    } else if (before) {
      nodes.pop();
    }

    const hasExtraItem = nodes.length > originalTake;

    if (hasExtraItem) nodes.pop();

    return {
      nodes,
      hasNextPage: takeMultiplier > 0 ? hasExtraItem : false,
      hasPreviousPage: takeMultiplier < 0 ? hasExtraItem : false,
    };
  }
}
