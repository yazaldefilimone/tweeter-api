import { Either } from '@/shared/error-handler/either';
import { userResponse, userToken } from '@/domain/user/dtos';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/domain/user/errors';
import { AlreadyExistsError, NotFoundError } from '@/domain/errors';

export type felidSignUserContracts =
  | InvalidBioError
  | InvalidEmailError
  | InvalidNameError
  | InvalidPasswordError
  | AlreadyExistsError;

export type felidLoginUserContracts = InvalidEmailError | InvalidPasswordError | NotFoundError;

export type signUserContracts = Either<felidSignUserContracts, userResponse>;

export type loginUserContracts = Either<felidLoginUserContracts, userToken>;
