import { Router } from "express";
import { validateBody } from "../../Middleware/ValidationMiddleware";
import {
  borrowBookBodyValidation,
  returnedBookBodyValidation,
  UserParamsTransactionHistory,
} from "../controllers/BorrowHistory/BorrowHistory.dto";
import {
  availableBooksReport,
  borrowBook,
  mostActiveMembers,
  mostBorrowedBooks,
  returnBook,
  transactionHistory,
} from "../controllers/BorrowHistory/BorrowHistory.controller";

const borrowHistoryRouter = Router();

borrowHistoryRouter.post(
  "/borrow",
  validateBody(borrowBookBodyValidation),
  borrowBook
);

borrowHistoryRouter.post(
  "/return",
  validateBody(returnedBookBodyValidation),
  returnBook
);

borrowHistoryRouter.get("/top-borrow-books", mostBorrowedBooks);

borrowHistoryRouter.get("/top-active-members", mostActiveMembers);

borrowHistoryRouter.get("/available-books-report", availableBooksReport);

borrowHistoryRouter.get(
  "/:userId",
  validateBody(UserParamsTransactionHistory),
  transactionHistory
);

export default borrowHistoryRouter;
