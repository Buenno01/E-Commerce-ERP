import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { TimestampScalar } from "@/infra/graphql/scalars/timestamp.scalar";
import { Money } from "@/infra/graphql/schema/money.type";

export const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        sku: {
            type: GraphQLString
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        slug: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: Money
        },
        createdAt: {
            type: TimestampScalar
        },
        updatedAt: {
            type: TimestampScalar
        }
    }
});