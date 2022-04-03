import { Either } from '@/shared/error-handler/either';
import { UserDto } from '@/domain/user/dtos';
import { notFoundError, invalidParamError } from '@/domain/errors';

export interface IsearchUserUseCase {
  preform: (data: IsearchUserUseCase.Input) => IsearchUserUseCase.Output;
}

export namespace IsearchUserUseCase {
  export type Input = {
    username: string;
    name: string;
  };
  export type Output = Promise<Either<notFoundError | invalidParamError, UserDto>>;
}
