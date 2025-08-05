import Joi from "joi";
import { BOOKS_GENRE } from "../../../libs/Constants/BooksConstants";

export const addBookValidation = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  publicationDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "publicationDate must be in DD-MM-YYYY format",
    }),
  genre: Joi.string().required(),
  totalCopies: Joi.number().integer().min(0).required(),
  borrowedCopies: Joi.number().integer().min(0).optional(),
  availableCopies: Joi.number().integer().min(0).optional(),
});

export const updateBookValidation = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  isbn: Joi.string().optional(),
  publicationDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "publicationDate must be in DD-MM-YYYY format",
    }),
  genre: Joi.string().optional(),
  totalCopies: Joi.number().integer().min(0).optional(),
  borrowedCopies: Joi.number().integer().min(0).optional(),
  availableCopies: Joi.number().integer().min(0).optional(),
});

export const updateBookParamsValidation = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

export const bookQueryValidation = Joi.object({
  genre: Joi.string()
    .valid(...Object.values(BOOKS_GENRE))
    .optional(),
  author: Joi.string().optional(),
  title: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  page: Joi.string().optional(),
  search: Joi.string().optional(),
});
