import pino from "pino";
import httpcontext from "express-http-context";
import { NextFunction, Request, Response } from "express";

const pinoLogger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

const logger = new Proxy(pinoLogger, {
  get(target, property, receiver) {
    target = httpcontext.get("logger") || target;
    return Reflect.get(target, property, receiver);
  },
});

const contextLoggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const child = pinoLogger.child({
    requestId: request.headers["X-Request-ID"],
  });
  httpcontext.set("logger", child);

  next();
};

export { logger, contextLoggerMiddleware };
