import express, { Express, Request, Response } from "express";
import cors from "cors";
import api from "./api";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript by Samir");
});

app.use(cors());
app.use("/api", api);

// Use error handler middleware
//app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
