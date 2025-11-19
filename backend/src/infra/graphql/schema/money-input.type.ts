import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const MoneyInput = new GraphQLInputObjectType({
    name: "MoneyInput",
    fields: {
        currencyCode: {
            type: new GraphQLNonNull(GraphQLString)
        },
        amount: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
})