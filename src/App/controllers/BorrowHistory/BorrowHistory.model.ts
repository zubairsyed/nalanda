import { model, Schema } from "mongoose";
import type {
  IBorrowTransactions,
  IBorrowTransactionsBooks,
} from "../../../libs/Types/BorrowTransactions";
import { USERS_DOCUMENT } from "../User/User.model";
import { BOOKS_DOCUMENT } from "../Books/Books.model";

export const BORROW_TRANSACTIONS = "borrow_transactions";

const transactionBookSchema = new Schema<IBorrowTransactionsBooks>({
  bookId: { type: Schema.Types.ObjectId, ref: BOOKS_DOCUMENT },
  title: String,
  author: String,
  quantity: Number,
  returnedQuantity: Number,
  returnedAt: Date,
});

const schema = new Schema<IBorrowTransactions>(
  {
    userId: { type: Schema.Types.ObjectId, ref: USERS_DOCUMENT },
    borrowedAt: { type: Date, default: () => new Date() },
    returnedAt: { type: Date, default: null },
    items: [transactionBookSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BorrowHistoryModel = model<IBorrowTransactions>(
  BORROW_TRANSACTIONS,
  schema
);
