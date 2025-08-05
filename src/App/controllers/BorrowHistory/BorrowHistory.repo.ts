import { BooksModel } from "../Books/Books.model";
import { USERS_DOCUMENT } from "../User/User.model";
import { BorrowHistoryModel } from "./BorrowHistory.model";

export const topBorrowedBooks = async () => {
  return await BorrowHistoryModel.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          bookId: "$items.bookId",
          title: "$items.title",
          author: "$items.author",
        },
        totalBorrowed: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalBorrowed: -1 } },
    { $limit: 10 },
  ]);
};

export const topActiveMembers = async () => {
  return await BorrowHistoryModel.aggregate([
    {
      $group: {
        _id: "$userId",
        totalBorrowed: {
          $sum: {
            $sum: "$items.quantity",
          },
        },
        transactions: { $sum: 1 },
      },
    },
    { $sort: { totalBorrowed: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: USERS_DOCUMENT, // or USERS_DOCUMENT
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        totalBorrowed: 1,
        transactions: 1,
      },
    },
  ]);
};

export const report = async () => {
  return await BooksModel.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $group: {
        _id: null,
        totalBooks: { $sum: "$totalCopies" },
        borrowedBooks: { $sum: "$borrowedCopies" },
        availableBooks: { $sum: "$availableCopies" },
      },
    },
    {
      $project: {
        _id: 0,
        totalBooks: 1,
        borrowedBooks: 1,
        availableBooks: 1,
      },
    },
  ]);
};
