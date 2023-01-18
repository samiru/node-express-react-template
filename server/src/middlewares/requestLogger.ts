import { NextFunction, Request, Response } from "express";
import httpContext from "express-http-context";
import morgan from "morgan";

morgan.token("request-id", (request, response) => {
  const requestId = httpContext.get("requestId");
  return requestId;
});

morgan.token("request-time", (request, response) => {
  const requestTime = httpContext.get("requestTime").toUTCString();
  return requestTime;
});

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const format = `:request-id :remote-addr - [:request-time] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`;
  const logger = morgan(format);
  return logger(request, response, next);
};

export default requestLogger;
