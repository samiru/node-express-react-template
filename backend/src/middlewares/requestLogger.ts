import { NextFunction, Request, Response } from "express";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`[Request]: ${request.method} ${request.url}`);
  next();
};

export default requestLogger;
