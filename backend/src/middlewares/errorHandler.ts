import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send({ message: error.message });
};

export default errorHandler;
