import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

export const validateBody = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0]?.message });
      return;
    }
    next();
  };
};

export const validateParams = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).send({ message: error.details[0]?.message });
      return;
    }
    next();
  };
};

export const validateQuery = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query, { convert: true });
    if (error) {
      res.status(400).send({ message: error.details[0]?.message });
      return;
    }
    next();
  };
};
