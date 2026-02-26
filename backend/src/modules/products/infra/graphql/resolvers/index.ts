import productCreate from "./product-create.resolver";
import productById from "./product-by-id.resolver";
import productsQuery from "./products-query.resolver";
import { ProductType } from "../schemas/product.type";
import { ProductCreateInput } from "../schemas/product-create-input.type";
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
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
      after: {
        type: GraphQLString,
        description:
          "Cursor for forward pagination: returns products listed after this cursor. (Takes precedence if 'before' is also defined)",
      },
      before: {
        type: GraphQLString,
        description:
          "Cursor for backward pagination: returns products listed before this cursor.",
      },
      first: {
        type: GraphQLInt,
        description: "The amount of items that should be returned",
        default: 15,
      },
    },
  },
};
