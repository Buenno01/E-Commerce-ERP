import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

const toCursor = (id: string) => Buffer.from(id).toString("base64");

export const PageInfoType = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    startCursor: {
      type: GraphQLString,
      resolve: (connection) => {
        const first = connection.nodes?.[0];
        return first ? toCursor(first.id) : null;
      },
    },
    endCursor: {
      type: GraphQLString,
      resolve: (connection) => {
        const last = connection.nodes?.at(-1);
        return last ? toCursor(last.id) : null;
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
