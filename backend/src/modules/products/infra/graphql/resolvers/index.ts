import productCreate from "./product-create.resolver";
import { ProductType } from "../schemas/product.type";
import { ProductCreateInput } from "../schemas/product-create-input.type";

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

export default {
  Mutation,
};
