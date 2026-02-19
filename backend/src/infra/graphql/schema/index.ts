import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { Mutation as ProductMutation } from "@products/infra/graphql/resolvers";

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
  },
});

export default new GraphQLSchema({ mutation, query });
