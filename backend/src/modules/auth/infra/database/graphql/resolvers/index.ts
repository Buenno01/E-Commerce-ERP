import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import authCodeRequest from "./auth-code-request.resolver";
import authCodeVerify from "./auth-code-verify.resolver";

export const Mutation = {
  authCodeRequest: {
    resolve: authCodeRequest,
    type: new GraphQLObjectType({
      name: "AuthCodeRequestReturn",
      fields: {
        message: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
  },
  authCodeVerify: {
    resolve: authCodeVerify,
    type: new GraphQLObjectType({
      name: "AuthCodeVerificationReturn",
      fields: {
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      code: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
  },
};

export const Query = {};
