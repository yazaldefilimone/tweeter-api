import { makeSignUpFacture } from '@/main/factories/user';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/signup', makeSignUpFacture);

export { usersRouter };
