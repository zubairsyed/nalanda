import { Router } from "express";
import userRouter from "./User.router";
import booksRouter from "./Book.router";
import borrowHistoryRouter from "./BorrowHistory.router";

const mainRouter = Router();

mainRouter.use("/auth", userRouter);
mainRouter.use("/books", booksRouter);
mainRouter.use("/borrow-history", borrowHistoryRouter);

export default mainRouter;
