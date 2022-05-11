import { UserUseCase } from '@/data/use-cases/user';
import { Encoder } from '@/infra/encoder';
import { UserRepository } from '@/infra/prisma/repositories/user';
import { SignUpUserController, LoginUserController } from '@/presentation/controllers/user';
import { Request, Response } from 'express';

const userRepository = new UserRepository();
const encoder = new Encoder();
const userUseCase = new UserUseCase(userRepository, encoder);

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
