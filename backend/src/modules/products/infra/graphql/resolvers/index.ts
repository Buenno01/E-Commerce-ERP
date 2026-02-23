import productCreate from "./product-create.resolver";
import productById from "./product-by-id.resolver";
import { ProductType } from "../schemas/product.type";
import { ProductCreateInput } from "../schemas/product-create-input.type";
import { GraphQLID } from "graphql";

export const Mutation = {
  productCreate: {
    resolve: productCreate,
    type: ProductType,
    args: {
      input: {
        type: ProductCreateInput,
      },
    },
  },
};

export const Query = {
  product: {
    resolve: productById,
    type: ProductType,
    args: {
      id: { type: GraphQLID },
    },
  },
};

export default {
  Mutation,
};
