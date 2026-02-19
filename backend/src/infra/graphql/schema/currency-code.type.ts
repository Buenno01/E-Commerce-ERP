import { GraphQLEnumType } from "graphql";

export const CurrencyCode = new GraphQLEnumType({
  name: "CurrencyCode",
  values: {
    BRL: {
      value: "BRL",
      description: 'Brazilian "Real" currency code',
    },
  },
});
