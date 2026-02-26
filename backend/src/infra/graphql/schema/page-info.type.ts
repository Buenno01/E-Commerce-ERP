import { encode } from "@/lib/cursor";
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    startCursor: {
      type: GraphQLString,
      resolve: (connection) => {
        const first = connection.nodes?.[0];
        return first ? encode(first.id) : null;
      },
    },
    endCursor: {
      type: GraphQLString,
      resolve: (connection) => {
        const last = connection.nodes?.at(-1);
        return last ? encode(last.id) : null;
      },
    },
    hasNextPage: {
      type: GraphQLBoolean,
      resolve: (connection) => connection.hasNextPage ?? false,
    },
    hasPreviousPage: {
      type: GraphQLBoolean,
      resolve: (connection) => connection.hasPreviousPage ?? false,
    },
  },
});
