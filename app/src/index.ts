import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import locationRoutes from './api/routes/locationRoutes';
import forecastRoutes from './api/routes/forecastRoutes';

/**
 * Entry point for the application.
 * 
 * @remarks
 * This file initializes the Express application, sets up middleware, and registers API routes.
 */
const app: Express = express();
app.disable('x-powered-by'); // Disable 'x-powered-by' header for security reasons
const port = process.env.PORT ?? 3000;

// Load OpenAPI specification
const openApiSpec = yaml.load(fs.readFileSync('./specs/swagger.yaml', 'utf8')) as object;

app.use(express.json());

// Serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Register routes
app.use('/api/v1', locationRoutes);
app.use('/api/v1', forecastRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`📚[docs]: API docs available at http://localhost:${port}/api-docs`);
});
