import {
  makeSignUpFacture,
  makeLoginFacture,
  makeUpdateProfileFacture,
  makeUpdateAvatarFacture,
  makeUpdateBannerFacture,
  makeFindAllFacture,
  makeFindByNameFacture,
  makeFindByIdFacture,
  makeDeleteUserByIdFacture,
} from '@/main/factories/user';
import { authUserJwtMiddleware } from '@/main/middlewares/auth-middlewares';
import { multerImageUploadConfig } from '@/shared/multer';
import { Router } from 'express';
import multer from 'multer';

const usersRouter = Router();
const multerImageUpload = multer(multerImageUploadConfig);

usersRouter.post('/signup', makeSignUpFacture);
usersRouter.post('/login', makeLoginFacture);
usersRouter.put('/update/profile', authUserJwtMiddleware, makeUpdateProfileFacture);
usersRouter.put('/update/avatar', authUserJwtMiddleware, multerImageUpload.single('img'), makeUpdateAvatarFacture);
usersRouter.put('/update/banner', authUserJwtMiddleware, multerImageUpload.single('img'), makeUpdateBannerFacture);
usersRouter.get('/find', authUserJwtMiddleware, makeFindAllFacture);
usersRouter.get('/find/name/:name', authUserJwtMiddleware, makeFindByNameFacture);
usersRouter.get('/find/id/:id', authUserJwtMiddleware, makeFindByIdFacture);
usersRouter.delete('/delete/id/:id', authUserJwtMiddleware, makeDeleteUserByIdFacture);

export { usersRouter };
