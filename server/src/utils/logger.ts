import pino from "pino";
import httpcontext from "express-http-context";
import { NextFunction, Request, Response } from "express";

const pinoLogger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

// Use logger from context if available, otherwise use default logger
// See https://blog.logrocket.com/logging-with-pino-and-asynclocalstorage-in-node-js/
const logger = new Proxy(pinoLogger, {
  get(target, property, receiver) {
    target = httpcontext.get("logger") || target;
    return Reflect.get(target, property, receiver);
  },
});

// Add logger with request id to context
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
