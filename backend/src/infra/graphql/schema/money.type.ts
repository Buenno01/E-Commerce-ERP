import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const Money = new GraphQLObjectType({
    name: "Money",
    fields: {
        currencyCode: {
            type: new GraphQLNonNull(GraphQLString)
        },
        amount: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
})