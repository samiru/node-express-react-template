import { NextFunction, Request, Response } from "express";

const requestDate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.headers["X-Request-Time"] = Date.now().toString();
  next();
};

export default requestDate;
