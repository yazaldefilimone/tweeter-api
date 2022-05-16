import { makeSignUpFacture, makeLoginFacture, makeUpdateProfileFacture } from '@/main/factories/user';
import { authUserJwtMiddleware } from '@/main/middlewares/auth-middlewares';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/signup', makeSignUpFacture);
usersRouter.post('/login', makeLoginFacture);
usersRouter.put('/update', authUserJwtMiddleware, makeUpdateProfileFacture);
export { usersRouter };
