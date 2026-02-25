import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLInputFieldConfigMap,
  GraphQLFloat,
} from "graphql";

export const StringFilterInput = new GraphQLInputObjectType({
  name: "StringFilterInput",
  fields: {
    equals: { type: GraphQLString },
    contains: { type: GraphQLString },
    startsWith: { type: GraphQLString },
  },
});

export const IntFilterInput = new GraphQLInputObjectType({
  name: "IntFilterInput",
  fields: {
    equals: { type: GraphQLInt },
    gte: { type: GraphQLInt },
    lte: { type: GraphQLInt },
    gt: { type: GraphQLInt },
    lt: { type: GraphQLInt },
  },
});

export const FloatFilterInput = new GraphQLInputObjectType({
  name: "FloatFilterInput",
  fields: {
    equals: { type: GraphQLFloat },
    gte: { type: GraphQLFloat },
    lte: { type: GraphQLFloat },
    gt: { type: GraphQLFloat },
    lt: { type: GraphQLFloat },
  },
});

export const FilterInput = (
  name: string,
  fields: GraphQLInputFieldConfigMap,
) => {
  const FilterType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name,
    fields: () => ({
      ...fields,
      AND: { type: new GraphQLList(new GraphQLNonNull(FilterType)) },
      OR: { type: new GraphQLList(new GraphQLNonNull(FilterType)) },
      NOT: { type: FilterType },
    }),
  });

  return FilterType;
};
