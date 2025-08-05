import { Router } from "express";
import { signIn, signUp } from "../controllers/User/User.controller";
import { validateBody } from "../../Middleware/ValidationMiddleware";
import {
  signInValidation,
  signUpValidation,
} from "../controllers/User/User.dto";

const userRouter = Router();

userRouter.post("/sign-in", validateBody(signInValidation), signIn);
userRouter.post("/sign-up", validateBody(signUpValidation), signUp);

export default userRouter;
