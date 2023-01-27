import { NextFunction, Request, Response } from "express";
import httpcontext from "express-http-context";
import { v4 as uuidv4 } from "uuid";

const requestId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestId = uuidv4();

  // Set request id in request headers
  request.headers["x-request-id"] = requestId;

  // Set CORS headers for allowing request id to be sent
  response.set("Access-Control-Allow-Headers", "x-request-id");
  response.set("Access-Control-Expose-Headers", "x-request-id");

  // Set request id in response headers
  response.set("x-request-id", requestId);

  // Set request id in context
  httpcontext.set("requestId", requestId);

  next();
};

export default requestId;
