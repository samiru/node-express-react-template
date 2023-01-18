import { NextFunction, Request, Response } from "express";
import httpcontext from "express-http-context";

const requestDate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  httpcontext.set("requestTime", new Date());
  next();
};

export default requestDate;
