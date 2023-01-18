import { NextFunction, Request, Response } from "express";
import httpcontext from "express-http-context";

const requestTime = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  httpcontext.set("requestTime", new Date());
  next();
};

export default requestTime;
