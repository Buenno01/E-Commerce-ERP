import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { EdgeType } from "./edge.type";
import { PageInfoType } from "./page-info.type";

export const ConnectionType = (ConnectedEntity: GraphQLObjectType) =>
  new GraphQLObjectType({
    name: `${ConnectedEntity.name}Connection`,
    fields: {
      edges: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(EdgeType(ConnectedEntity))),
        ),
        resolve: (connection) => connection.nodes,
      },
      nodes: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(ConnectedEntity)),
        ),
      },
      pageInfo: {
        type: new GraphQLNonNull(PageInfoType),
        resolve: (connection) => connection,
      },
    },
  });

export interface ConnectionUseCaseInterface<T> {
  nodes: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
