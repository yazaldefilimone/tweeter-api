import { Either } from '@/shared/error-handler/either';
import { UserDto } from '@/domain/user/dtos';
import { invalidParamError } from '@/domain/user/errors';

export type CreateUserFailure = invalidParamError;
export type CreateEntityUserReponse = Either<CreateUserFailure, UserDto>;
