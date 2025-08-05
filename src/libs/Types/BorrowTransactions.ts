import type { Types } from "mongoose";

export interface IBorrowTransactionsBooks {
  bookId: Types.ObjectId;
  title: string;
  author: string;
  quantity: number;
  returnedQuantity: number;
  returnedAt: Date;
}

export interface IBorrowTransactions {
  userId: Types.ObjectId;
  borrowedAt: Date;
  returnedAt: Date | null;
  items: [IBorrowTransactionsBooks];
  isDeleted?: boolean;
}
