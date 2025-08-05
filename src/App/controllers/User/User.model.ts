import { model, Schema } from "mongoose";
import type { IUser } from "../../../libs/Types/User";

export const USERS_DOCUMENT = "user";

const schema = new Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    passwordLastupdated: Date,
    isAdmin: { type: Boolean },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>(USERS_DOCUMENT, schema);
