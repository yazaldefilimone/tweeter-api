import { Either } from '@/shared/error-handler/either';
import { UserDTO } from '@/domain/user/dtos';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/domain/user/errors';
import { AlreadyExistsError, NotFoundError } from '@/domain/errors';

export type felidSignUserContracts = InvalidBioError | InvalidEmailError | InvalidNameError | InvalidPasswordError | AlreadyExistsError;

export type felidFindUserContracts = InvalidEmailError | InvalidNameError | NotFoundError;
export type felidLoginUserContracts = InvalidEmailError | InvalidPasswordError | NotFoundError;

export type signUserContracts = Either<felidSignUserContracts, UserDTO>;

type loginUserSuccess = {
  token: string;
  user: UserDTO;
};
export type loginUserContracts = Either<felidLoginUserContracts, loginUserSuccess>;

export type findUserContracts<T> = Either<felidFindUserContracts, T>;
