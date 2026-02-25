import productCreate from "./product-create.resolver";
import productById from "./product-by-id.resolver";
import productsQuery from "./products-query.resolver";
import { ProductType } from "../schemas/product.type";
import { ProductCreateInput } from "../schemas/product-create-input.type";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { ProductConnection } from "../schemas/product-connection.type";
import { ProductFilterType } from "../schemas/product-connection-filter.type";

export const Mutation = {
  productCreate: {
    resolve: productCreate,
    type: ProductType,
    args: {
      input: {
        type: new GraphQLNonNull(ProductCreateInput),
      },
    },
  },
};

export const Query = {
  product: {
    resolve: productById,
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
  },
  products: {
    resolve: productsQuery,
    type: ProductConnection,
    args: {
      filters: {
        type: ProductFilterType,
      },
    },
  },
};

export default {
  Mutation,
};
