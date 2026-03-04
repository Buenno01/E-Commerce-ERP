import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "@infra/graphql/schema";
import { container } from "@infra/container";
import { getAuthenticatedUser } from "@/infra/graphql/middlewares/auth.middleware";

const graphqlRoutes = Router();

graphqlRoutes.all(
  "/graphql",
  createHandler({
    schema,
    context: ({ raw }) => ({
      container,
      user: getAuthenticatedUser(raw.headers.authorization),
    }),
  }),
);

export default graphqlRoutes;
