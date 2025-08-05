import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const ErrorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error.isOperational) {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res.status(500).send({ message: "Internal Error" });
};
