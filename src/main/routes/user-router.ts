import {
  sigInUserControllerFactore,
  loginUserControllerFactore,
  searchUserControllerFactore,
} from '@/main/factories/presentation/controllers/user';

import { routerAdapter } from '@/main/adapters';

import { Router } from 'express';

const userRouter = Router();

userRouter.post('/sigin', routerAdapter(sigInUserControllerFactore()));
userRouter.post('/login', routerAdapter(loginUserControllerFactore()));
userRouter.post('/search/user', routerAdapter(searchUserControllerFactore()));

export { userRouter };
