import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const EdgeType = (ConnectedEntity: GraphQLObjectType) =>
  new GraphQLObjectType({
    name: "Edge",
    fields: {
      node: {
        type: new GraphQLNonNull(ConnectedEntity),
        resolve: (edge) => edge,
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (edge) => Buffer.from(edge.id).toString("base64"),
      },
    },
  });
