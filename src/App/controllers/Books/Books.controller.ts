import { Request, Response } from "express";
import { BooksModel } from "./Books.model";
import { AppError } from "../../../Utils/CustomErrorMiddleware";
import { ERROR_CONSTANTS } from "../../../libs/Constants/ErrorConstants";
import { searchBooks } from "./Books.repo";

export const getBook = async (req: Request, res: Response): Promise<any> => {
  if (!req.user?.isAdmin)
    throw new AppError(ERROR_CONSTANTS.FORBIDDEN, "Restricted!");
  const response = await BooksModel.findOne({ _id: req.params.id });
  return res.status(200).send({ message: response });
};

export const getList = async (req: Request, res: Response): Promise<any> => {
  if (!req.user?.isAdmin)
    throw new AppError(ERROR_CONSTANTS.FORBIDDEN, "Restricted!");
  const { page, limit, ...searchQuery } = req.query;
  const response = await searchBooks(searchQuery, {
    page: page as string,
    limit: limit as string,
  });
  return res.status(200).send({ message: response });
};

export const addBook = async (req: Request, res: Response): Promise<any> => {
  if (!req.user?.isAdmin)
    throw new AppError(ERROR_CONSTANTS.FORBIDDEN, "Restricted!");
  const { title, author, isbn, ...data } = req.body;
  data.publicationDate = new Date(req.body.publicationDate).toISOString();
  const book = await BooksModel.updateOne(
    {
      title: title.toLowerCase(),
      author: author.toLowerCase(),
      isbn: isbn,
    },
    data,
    { upsert: true }
  );
  return res.status(200).send({ message: "Books Added!" });
};

export const updateBook = async (req: Request, res: Response): Promise<any> => {
  if (!req.user?.isAdmin)
    throw new AppError(ERROR_CONSTANTS.FORBIDDEN, "Restricted!");
  const { title, author, isbn, ...data } = req.body;
  const book = await BooksModel.findByIdAndUpdate(
    { _id: req.params?.id },
    data,
    { new: true }
  );
  return res.status(200).send({ message: book });
};

export const deleteBook = async (req: Request, res: Response): Promise<any> => {
  if (!req.user?.isAdmin)
    throw new AppError(ERROR_CONSTANTS.FORBIDDEN, "Restricted!");
  await BooksModel.findByIdAndUpdate(
    { _id: req.params.id },
    { isDeleted: true }
  );
  return res.status(200).send({ message: "Book removed!" });
};
