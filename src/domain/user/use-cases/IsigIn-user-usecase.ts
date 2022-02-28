import { Either } from '@/shared/error-handler/either';
import { UserDto, CreateUserDto } from "@/domain/user/dtos';
import { alreadyExistsError } from '@/domain/user/errors'

export interface IsigInUserUseCase{
  preform: (Data:IsigInUserUseCase.Input) => Promise<IsigInUserUseCase.Output>
}


export namespace IsigInUserUseCase{
  export type Input = UserDto;
  export type Output = Either<alreadyExistsError, CreateUserDto>;
}

