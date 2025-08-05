import "express";
import { IUser } from "../../libs/Types/User";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}
