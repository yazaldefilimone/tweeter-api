import { NotFoundError } from '@/domain/errors';
import { Either } from '@/shared/error-handler/either';
import { user, userParam, userUpdateDTO } from '../dtos';
import { findUserContracts, loginUserContracts, signUserContracts } from './contracts';

export interface IUserUseCase {
  signup: (data: IUserUseCase.signInput) => IUserUseCase.signOutput;
  login: (data: IUserUseCase.loginInput) => IUserUseCase.loginOutput;
  updateProfile: (data: IUserUseCase.updateInput) => IUserUseCase.signOutput;
  updateAvatar: (data: { id: string; avatar: string }) => IUserUseCase.updateOutput;
  updateBanner: (data: { id: string; banner: string }) => IUserUseCase.updateOutput;
  findById: ({ id }: { id: string }) => IUserUseCase.signOutput;
  findAll: ({ id }: { id: string }) => IUserUseCase.signOutput;
}
export namespace IUserUseCase {
  export type signInput = user;
  export type updateInput = userUpdateDTO;
  export type updateOutput = Promise<Either<NotFoundError, { id: string }>>;
  export type signOutput = Promise<signUserContracts>;
  export type loginInput = userParam;
  export type loginOutput = Promise<loginUserContracts>;
  export type findOutput<T> = Promise<findUserContracts<T>>;
}
