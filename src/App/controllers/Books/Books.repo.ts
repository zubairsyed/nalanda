import { IResource } from "../../../libs/Types/Params.type";
import { BooksModel } from "./Books.model";

export const searchBooks = async (search: any, params?: IResource) => {
  const {
    orderBy = "updatedAt",
    sort = "desc",
    page = "0",
    limit = "20",
  } = params || {};
  let query = BooksModel.find({ isDeleted: false });
  if (search) {
    query.or(
      Object.entries(search).map(([key, value]) => ({
        [key]: { $regex: value, $options: "i" },
      }))
    );
  }
  const totalCount = await query.countDocuments();
  const items = await BooksModel.find({ isDeleted: false })
    .merge(query)
    .sort({ [orderBy]: sort })
    .skip(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit))
    .lean()
    .exec();

  return { items, totalCount };
};
