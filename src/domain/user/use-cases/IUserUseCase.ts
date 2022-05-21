import { NotFoundError } from '@/domain/errors';
import { Either } from '@/shared/error-handler/either';
import { UserBuildDTO, UserDTO, UserSimpleDTO } from '../dtos';
import { findUserContracts, loginUserContracts, signUserContracts } from './contracts';

export interface IUserUseCase {
  signup: (data: IUserUseCase.signInput) => IUserUseCase.signOutput;
  login: (data: IUserUseCase.loginInput) => IUserUseCase.loginOutput;
  updateProfile: (data: IUserUseCase.updateInput) => IUserUseCase.signOutput;
  updateAvatar: (data: { id: string; avatar: string }) => IUserUseCase.updateOutput;
  updateBanner: (data: { id: string; banner: string }) => IUserUseCase.updateOutput;
  findById: ({ id }: { id: string }) => IUserUseCase.signOutput;
  findByName: ({ name }: { name: string }) => IUserUseCase.findOutput<UserDTO[]>;
  findAll: ({ page, limit }: { page: number; limit: number }) => IUserUseCase.findOutput<UserDTO[]>;
  deleteById: ({ id }: { id: string }) => IUserUseCase.updateOutput;
}
export namespace IUserUseCase {
  export type signInput = UserBuildDTO;
  export type updateInput = { id: string; data: UserBuildDTO };
  export type updateOutput = Promise<Either<NotFoundError, { id: string }>>;
  export type signOutput = Promise<signUserContracts>;
  export type loginInput = UserSimpleDTO;
  export type loginOutput = Promise<loginUserContracts>;
  export type findOutput<T> = Promise<findUserContracts<T>>;
}
