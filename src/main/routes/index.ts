import { Router } from 'express';
import { usersRouter } from '@/main/routes/user';

const routes = Router();
routes.use('/user', usersRouter);
export { routes };
