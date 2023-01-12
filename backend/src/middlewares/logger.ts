import { NextFunction, Request, Response } from "express";

const logger = (request: Request, response: Response, next: NextFunction) => {
  console.log(`[Logger]: ${request.method} ${request.url}`);
  next();
};

export default logger;
