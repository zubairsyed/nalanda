import { Router } from "express";
import {
  addBook,
  deleteBook,
  getBook,
  getList,
  updateBook,
} from "../controllers/Books/Books.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../Middleware/ValidationMiddleware";
import {
  addBookValidation,
  bookQueryValidation,
  updateBookParamsValidation,
  updateBookValidation,
} from "../controllers/Books/Books.dto";

const booksRouter = Router();

booksRouter.get("/list", validateQuery(bookQueryValidation), getList);
booksRouter.get("/:id", validateParams(updateBookParamsValidation), getBook);
booksRouter.patch("/", validateBody(addBookValidation), addBook);
booksRouter.patch(
  "/:id",
  validateParams(updateBookParamsValidation),
  validateBody(updateBookValidation),
  updateBook
);
booksRouter.delete(
  "/:id",
  validateParams(updateBookParamsValidation),
  deleteBook
);

export default booksRouter;
