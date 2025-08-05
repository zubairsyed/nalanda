import Joi from "joi";
export const borrowBookBodyValidation = Joi.object({
  userId: Joi.string().length(24).hex().required(),
  bookId: Joi.string().length(24).hex().required(),
  quantity: Joi.number().integer().min(1).max(100).required(),
});

export const returnedBookBodyValidation = Joi.object({
  transactionId: Joi.string().length(24).hex().required(),
  bookId: Joi.string().length(24).hex().required(),
  quantityToReturn: Joi.number().integer().min(1).max(100).required(),
});

export const UserParamsTransactionHistory = Joi.object({
  userId: Joi.string().length(24).hex().required(),
});
