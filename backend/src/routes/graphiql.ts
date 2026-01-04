import { Router } from "express";
import { ruruHTML } from "ruru/server";

const graphiqlRoute = Router();

graphiqlRoute.get(
    '/graphiql',
    (_, res) => {        
        res.type('html');
        res.end(ruruHTML({ endpoint: '/graphql' }));
    }
);

export default graphiqlRoute;