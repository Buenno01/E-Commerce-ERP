import {
  FilterInput,
  StringFilterInput,
  FloatFilterInput,
} from "@/infra/graphql/schema/connection-filter.type";

export const ProductFilterType = FilterInput("ProductFilter", {
  id: {
    type: StringFilterInput,
  },
  sku: {
    type: StringFilterInput,
  },
  name: {
    type: StringFilterInput,
  },
  slug: {
    type: StringFilterInput,
  },
  description: {
    type: StringFilterInput,
  },
  price: {
    type: FloatFilterInput,
  },
});
