import { NextFunction, Request, Response } from "express";
import httpcontext from "express-http-context";
import { v4 as uuidv4 } from "uuid";

const requestId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestId = uuidv4();

  request.headers["X-Request-ID"] = requestId;
  httpcontext.set("requestId", requestId);

  next();
};

export default requestId;
