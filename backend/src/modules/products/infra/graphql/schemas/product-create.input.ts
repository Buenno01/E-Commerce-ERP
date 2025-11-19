import { MoneyInput } from "@/infra/graphql/schema/money-input.type";
import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

export const ProductCreateInput = new GraphQLInputObjectType({
    name: "ProductCreateInput",
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        slug: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: MoneyInput
        },
        quantity: {
            type: GraphQLInt
        },
        sku: {
            type: GraphQLString
        }
    }
})