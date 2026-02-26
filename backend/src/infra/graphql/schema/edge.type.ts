import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { encode } from "@/lib/cursor";

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
        resolve: (edge) => encode(edge.id),
      },
    },
  });
