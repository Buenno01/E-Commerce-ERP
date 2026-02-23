import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "@infra/graphql/schema";
import { container } from "@infra/container";

const graphqlRoutes = Router();

graphqlRoutes.all(
  "/graphql",
  createHandler({ schema, context: { container } }),
);

export default graphqlRoutes;
