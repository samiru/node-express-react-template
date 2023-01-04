import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./api/index";

const port = 3001;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(cors());
app.use("/api", router);

// Use error handler middleware
//app.use(errorHandler);

// Start server (only if not testing)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
  });
}

export default app;
