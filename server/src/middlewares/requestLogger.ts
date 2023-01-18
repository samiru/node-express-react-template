import { NextFunction, Request, Response } from "express";
import httpContext from "express-http-context";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestTime = httpContext.get("requestTime");
  console.log(
    `[Request]: ${requestTime.toUTCString()} ${request.method} ${request.url}`
  );

  next();
};

export default requestLogger;
