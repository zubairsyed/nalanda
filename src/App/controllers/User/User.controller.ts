import { Application, NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "./User.model";
import { IUser } from "../../../libs/Types/User";
import { createToken } from "../../../libs/Service-utils/Jwt";
import { ACCESS_TOKEN_EXPIRY } from "../../../libs/Constants/Constants";
import { AppError } from "../../../Utils/CustomErrorMiddleware";
import {
  API_ERRORS,
  ERROR_CONSTANTS,
} from "../../../libs/Constants/ErrorConstants";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const isUserExists = await UserModel.findOne({
    email: req.body.email,
  })
    .lean()
    .exec();
  if (isUserExists) {
    throw new AppError(
      ERROR_CONSTANTS.CONFLICT,
      "User already exists, please login!"
    );
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser: any = await UserModel.create<IUser>(req.body);
  const accessToken: any = createToken(
    {
      email: req.body.email,
      id: newUser?._id,
      isAdmin: newUser?.isAdmin,
      name: newUser?.name,
    },
    process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY
  );
  const { password, __v, createdAt, updatedAt, ...user } = newUser.toObject();
  res.status(200).send({ message: { accessToken, user } });
  return;
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  const isUserExists: any = await UserModel.findOne({
    email: req.body.email,
  })
    .lean()
    .exec();
  if (!isUserExists) {
    throw new AppError(
      ERROR_CONSTANTS.NOT_FOUND,
      "Email or Password are incorrect!"
    );
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    isUserExists?.password
  );

  if (!isPasswordValid) {
    throw new AppError(
      ERROR_CONSTANTS.INVALID_CREDENTIALS,
      "Invalid Credentials!"
    );
  }

  const accessToken = createToken(
    {
      email: req.body.email,
      id: isUserExists._id,
      isAdmin: isUserExists.isAdmin,
      name: isUserExists.name,
    },
    process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY
  );
  if (!accessToken) {
    throw new Error("Could not generate access token!");
  }
  const { password, createdAt, updatedAt, __v, ...safeUser } = isUserExists; // make sure it's a plain object
  res.status(200).send({ message: { accessToken, safeUser } });
  return;
};
