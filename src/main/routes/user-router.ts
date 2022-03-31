import {
  sigInUserControllerFactore,
  loginUserControllerFactore,
} from "@/main/factories/presentation/controllers/user";

import { routerAdapter } from "@/main/adapters";

import { Router } from "express";

const userRouter = Router();

userRouter.post("/", routerAdapter(sigInUserControllerFactore()));
userRouter.post("/", routerAdapter(loginUserControllerFactore()));

export { userRouter };
