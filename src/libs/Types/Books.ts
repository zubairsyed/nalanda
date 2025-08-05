import { BOOKS_GENRE } from "../Constants/BooksConstants";

export interface IBooks {
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  totalCopies?: number;
  borrowedCopies?: number;
  availableCopies?: number;
  genre?: string;
  isDeleted?: boolean;
}
