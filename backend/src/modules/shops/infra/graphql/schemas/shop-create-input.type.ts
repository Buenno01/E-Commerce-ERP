import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const ShopCreateInput = new GraphQLInputObjectType({
  name: "ShopCreateInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    slug: {
      type: GraphQLString,
    },
  },
});
