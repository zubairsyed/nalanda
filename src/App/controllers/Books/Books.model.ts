import { model, Schema } from "mongoose";
import type { IBooks } from "../../../libs/Types/Books";

export const BOOKS_DOCUMENT = "books";

const schema = new Schema<IBooks>(
  {
    title: String,
    author: String,
    isbn: String, //ISBN is the acronym for International Standard Book Number
    publicationDate: Date,
    totalCopies: Number,
    borrowedCopies: Number,
    availableCopies: Number,
    genre: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BooksModel = model<IBooks>(BOOKS_DOCUMENT, schema);
