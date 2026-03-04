import { ShopCreateInput } from "../schemas/shop-create-input.type";
import { ShopType } from "../schemas/shop.type";
import shopCreate from "./shop-create.resolver";

export const Mutation = {
  shopCreate: {
    resolve: shopCreate,
    type: ShopType,
    args: {
      input: {
        type: ShopCreateInput,
      },
    },
  },
};

export const Query = {};
