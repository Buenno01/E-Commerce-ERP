import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import {
  Mutation as ProductMutation,
  Query as ProductQuery,
} from "@products/infra/graphql/resolvers";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...ProductMutation,
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello world!",
    },
    ...ProductQuery,
  },
});

export default new GraphQLSchema({ mutation, query });
