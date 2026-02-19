import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { CurrencyCode } from "./currency-code.type";

export const MoneyInput = new GraphQLInputObjectType({
  name: "MoneyInput",
  fields: {
    currencyCode: {
      type: new GraphQLNonNull(CurrencyCode),
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});
