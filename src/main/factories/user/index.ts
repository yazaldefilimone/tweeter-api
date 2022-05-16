import { UserUseCase } from '@/data/use-cases/user';
import { Encoder } from '@/infra/encoder';
import { UserRepository } from '@/infra/prisma/repositories/user';
import { CacheServices } from '@/infra/services/cache';
import { SignUpUserController, LoginUserController } from '@/presentation/controllers/user';
import { UpdateUserProfileController } from '@/presentation/controllers/user/UpdateUserController';
import { Request, Response } from 'express';

const userRepository = new UserRepository();
const encoder = new Encoder();
const cacheServices = new CacheServices();
const userUseCase = new UserUseCase(userRepository, cacheServices, encoder);

export const makeSignUpFacture = async function (request: Request, response: Response) {
  const signUpUserController = new SignUpUserController(userUseCase);
  const controller = await signUpUserController.execute(request, response);
  return controller;
};

export const makeLoginFacture = async function (request: Request, response: Response) {
  const loginUserController = new LoginUserController(userUseCase);
  const controller = await loginUserController.execute(request, response);
  return controller;
};

export const makeUpdateProfileFacture = async function (request: Request, response: Response) {
  const loginUserController = new UpdateUserProfileController(userUseCase);
  const controller = await loginUserController.execute(request, response);
  return controller;
};
