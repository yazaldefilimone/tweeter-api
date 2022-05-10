import { Either } from '@/shared/error-handler/either';
import { userStoreDTO } from '@/domain/user/dtos';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/domain/user/errors';

export type felidUserContracts = InvalidBioError | InvalidEmailError | InvalidNameError | InvalidPasswordError;
export type buildUserContracts = Either<felidUserContracts, userStoreDTO>;
