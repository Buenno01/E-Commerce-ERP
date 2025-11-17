import { Router } from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

const graphqlRoutes = Router();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello world!'
      },
    },
  }),
});

graphqlRoutes.all('/graphql', createHandler({ schema }));

export default graphqlRoutes;