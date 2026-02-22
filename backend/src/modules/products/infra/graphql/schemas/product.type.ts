import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { TimestampScalar } from "@/infra/graphql/scalars/timestamp.scalar";
import { Money } from "@/infra/graphql/schema/money.type";

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    sku: {
      type: GraphQLString,
      resolve: (product) => product.sku.value,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (product) => product.name.value,
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (product) => product.slug.value,
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: Money,
    },
    createdAt: {
      type: TimestampScalar,
    },
    updatedAt: {
      type: TimestampScalar,
    },
  },
});

export const ProductAttributes = new GraphQLObjectType({
  name: "ProductAttributes",
  fields: {
    id: {
      type: GraphQLID,
    },
    sku: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    slug: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: Money,
    },
    createdAt: {
      type: TimestampScalar,
    },
    updatedAt: {
      type: TimestampScalar,
    },
  },
});
