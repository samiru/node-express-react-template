import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { HTTPError, HTTPStatus } from "../utils/types";

const logError: ErrorRequestHandler = (
  error: HTTPError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.stack || error.message);
  next(error);
};

const returnError: ErrorRequestHandler = (
  error: HTTPError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response
    .status(error.status || HTTPStatus.INTERNAL_SERVER_ERROR)
    .send({ message: error.message });
};

export { logError, returnError };
