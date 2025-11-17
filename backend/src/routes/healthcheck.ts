import { Router } from 'express';

const healthcheckRoutes = Router();

healthcheckRoutes.get('/healthcheck', (_, res) => {
  res.status(200).send(
    `
        <h1>Hello world!</h1>
    `
  );
});

export default healthcheckRoutes;