import { Request, Response } from "express";
import { BooksModel } from "../Books/Books.model";
import { BorrowHistoryModel } from "./BorrowHistory.model";
import { AppError } from "../../../Utils/CustomErrorMiddleware";
import { ERROR_CONSTANTS } from "../../../libs/Constants/ErrorConstants";
import { report, topBorrowedBooks } from "./BorrowHistory.repo";

export const borrowBook = async (req: Request, res: Response) => {
  const book: any = await BooksModel.findOne({
    _id: req.body.bookId,
    isDeleted: false,
  });

  const quantityParam: any = req.body.quantity;
  if (!book || book.availableCopies < quantityParam) {
    throw new AppError(ERROR_CONSTANTS.CONFLICT, "Not enough copies available");
  }

  // Update book counts
  const updateBooksCount = await BooksModel.updateOne(
    { _id: req.body.bookId },
    {
      $inc: {
        borrowedCopies: quantityParam,
        availableCopies: -quantityParam,
      },
    }
  );

  // Save borrow transaction
  const borrowTransaction = new BorrowHistoryModel({
    userId: req.user.id,
    items: [
      {
        bookId: req.body.bookId,
        title: book.title,
        author: book.author,
        quantity: req.body.quantity,
        returnedQuantity: 0,
      },
    ],
  });

  const borrowed = await borrowTransaction.save();

  return res.status(200).send({ message: borrowed });
};

export const returnBook = async (req: Request, res: Response) => {
  const transaction = await BorrowHistoryModel.findOne({
    _id: req.body.transactionId,
    "items.bookId": req.body.bookId,
  });

  if (!transaction)
    throw new AppError(ERROR_CONSTANTS.NOT_FOUND, "Transaction not found");

  const item: any = transaction.items.find((item) =>
    item.bookId.equals(req.body.bookId)
  );

  const remainingToReturn = item.quantity - item.returnedQuantity;
  if (req.body.quantityToReturn > remainingToReturn) {
    throw new AppError(
      ERROR_CONSTANTS.BAD_REQUEST,
      "Returning more than borrowed"
    );
  }

  item.returnedQuantity += req.body.quantityToReturn;
  item.returnedAt = new Date();

  // If all items in the array are fully returned, mark main returnedAt
  if (transaction.items.every((i) => i.quantity === i.returnedQuantity)) {
    transaction.returnedAt = new Date();
  }

  await transaction.save();

  // Update book availability
  await BooksModel.updateOne(
    { _id: req.body.bookId },
    {
      $inc: {
        borrowedCopies: -req.body.quantityToReturn,
        availableCopies: req.body.quantityToReturn,
      },
    }
  );

  return res.status(200).send({ message: "Books returned successfully!" });
};

export const transactionHistory = async (req: Request, res: Response) => {
  const response = await BorrowHistoryModel.find({
    userId: req.params.userId,
    isDeleted: false,
  })
    .sort({ borrowedAt: -1 })
    .select("borrowedAt returnedAt items");

  return res.status(200).send({ message: response });
};

export const mostBorrowedBooks = async (req: Request, res: Response) => {
  const response = await topBorrowedBooks();
  return res.status(200).send({ message: response });
};

export const mostActiveMembers = async (req: Request, res: Response) => {
  const response = await topBorrowedBooks();
  return res.status(200).send({ message: response });
};

export const availableBooksReport = async (req: Request, res: Response) => {
  const response = await report();
  return res.status(200).send({ message: response });
};
