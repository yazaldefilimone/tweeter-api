import { invalidParamError } from '@/domain/errors';
import { CreatePostDTO } from '@/domain/post/dtos';
import { Either } from '@/shared/error-handler/either';

export interface IcreatePostUseCase {
  perform: (post: IcreatePostUseCase.Input) => IcreatePostUseCase.OutPut;
}

export namespace IcreatePostUseCase {
  export type Input = {
    id: string;
    photo?: string;
    content?: string;
  };
  export type OutPut = Promise<Either<invalidParamError, CreatePostDTO>>;
}
