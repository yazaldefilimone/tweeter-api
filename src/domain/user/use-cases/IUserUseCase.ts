import { user, userParam } from '../dtos';
import { findUserContracts, loginUserContracts, signUserContracts } from './contracts';

export interface IUserUseCase {
  signup: (data: IUserUseCase.signInput) => IUserUseCase.signOutput;
  login: (data: IUserUseCase.loginInput) => IUserUseCase.loginOutput;
  update: (data: IUserUseCase.updateInput) => IUserUseCase.signOutput;
}
export namespace IUserUseCase {
  export type signInput = user;
  export type updateInput = {
    id: string;
    data: user;
  };
  export type signOutput = Promise<signUserContracts>;
  export type loginInput = userParam;
  export type loginOutput = Promise<loginUserContracts>;
  export type findOutput<T> = Promise<findUserContracts<T>>;
}
