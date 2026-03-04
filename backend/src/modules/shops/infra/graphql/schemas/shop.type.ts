import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { TimestampScalar } from "@/infra/graphql/scalars/timestamp.scalar";

export const ShopType = new GraphQLObjectType({
  name: "Shop",
  fields: {
    ownerId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (shop) => shop.name.value,
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (shop) => shop.slug.value,
    },
    createdAt: {
      type: TimestampScalar,
    },
    updatedAt: {
      type: TimestampScalar,
    },
  },
});
