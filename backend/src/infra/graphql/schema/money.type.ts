import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { CurrencyCode } from "./currency-code.type";

export const Money = new GraphQLObjectType({
  name: "Money",
  fields: {
    currencyCode: {
      type: new GraphQLNonNull(CurrencyCode),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});
