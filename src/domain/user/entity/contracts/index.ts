import { Either } from '@/shared/error-handler/either';
import { UserBuildResponseDTO } from '@/domain/user/dtos';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '@/domain/user/errors';

export type felidUserContracts = InvalidBioError | InvalidEmailError | InvalidNameError | InvalidPasswordError;
export type buildUserContracts = Either<felidUserContracts, UserBuildResponseDTO>;
