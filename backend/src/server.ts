import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./api/index";
import logger from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

const port = 3001;
const app: Express = express();

// Enable CORS
app.use(cors());

// Handle CORS preflight requests
app.options("*", cors());

// Parse incoming JSON into request body
app.use(express.json());

// Logging middleware
app.use(logger);

// Error handling middleware
app.use(errorHandler);

// Define API routes
app.use("/api", router);

// Start server (only if not testing!)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
  });
}

export default app;
