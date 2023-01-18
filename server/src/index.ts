import express, { Express } from "express";
import cors from "cors";
import router from "./api/index";
import requestLogger from "./middlewares/requestLogger";
import { logError, returnError } from "./middlewares/errorHandler";
import requestTime from "./middlewares/requestTime";
import httpContext from "express-http-context";

const port = 3001;
const app: Express = express();

// Enable CORS
app.use(cors());

// Handle CORS preflight requests
app.options("*", cors());

// Parse incoming JSON into request body
app.use(express.json());

// Enable http context
app.use(httpContext.middleware);

// Add request time to request headers
app.use(requestTime);

// Log requests
app.use(requestLogger);

// Define API routes
app.use("/api", router);

// Log errors
app.use(logError);

// Return error to client
app.use(returnError);

// Start server (only if not testing!)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
  });
}

export default app;
