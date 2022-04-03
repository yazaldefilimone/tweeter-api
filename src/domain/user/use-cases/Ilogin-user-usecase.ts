import { Either } from '@/shared/error-handler/either';
import { CreateUserDto, UserLogin } from '../dtos';
import { invalidParamError, notFoundError } from '@domain/errors';

export interface IloginUserUseCase {
  preform: (Input: IloginUserUseCase.Input) => IloginUserUseCase.Output;
}

export namespace IloginUserUseCase {
  export type Input = UserLogin;
  export type Output = Promise<Either<invalidParamError | notFoundError, CreateUserDto>>;
}
