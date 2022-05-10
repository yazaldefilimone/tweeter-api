import { Either } from '@/shared/error-handler/either';
import { userResponse, userStoreDTO } from '@/domain/user/dtos';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/domain/user/errors';
import { AlreadyExistsError } from '@/domain/errors';

export type felidSignUserContracts =
  | InvalidBioError
  | InvalidEmailError
  | InvalidNameError
  | InvalidPasswordError
  | AlreadyExistsError;
export type signUserContracts = Either<felidSignUserContracts, userResponse>;
