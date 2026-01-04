import express from 'express';
import graphqlRoutes from './routes/graphql';
import healthcheckRoutes from './routes/healthcheck';
import graphiqlRoute from './routes/graphiql';

class App {
  constructor(
    private readonly port: number,
    private readonly app: express.Application = express(),
  ) {}

  start() {
    this.setupConfig();
    this.setupRoutes();
    this.app.listen(this.port, () => {
      console.log(`App is running on port ${this.port}`);
    });
  }

  private setupRoutes() {
    this.app.use(graphiqlRoute)
    this.app.use(graphqlRoutes);
    this.app.use(healthcheckRoutes);
  }

  private setupConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default App;