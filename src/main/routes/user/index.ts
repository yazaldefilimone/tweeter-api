import { makeSignUpFacture, makeLoginFacture } from '@/main/factories/user';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/signup', makeSignUpFacture);
usersRouter.post('/login', makeLoginFacture);

export { usersRouter };
