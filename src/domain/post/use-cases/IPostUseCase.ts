import { NotFoundError } from '@/domain/errors';
import { Either } from '@/shared/error-handler/either';
import { post } from '../dtos';
import { postUseCaseFailedMany, postUseCaseResponse, postUseCaseResponseMany, postUseCaseSuccess } from './contracts';

export interface IPostUseCase {
  create: (data: IPostUseCase.Input) => IPostUseCase.Output;
  deleteById: (data: { id: string; userId: string }) => IPostUseCase.DeleteOutput;
  findByUserId: (data: { userId: string; limit: number; page: number }) => IPostUseCase.OutputMany;
  findById: (data: IPostUseCase.InputId) => IPostUseCase.Output;
  find: (data: { limit: number; page: number }) => IPostUseCase.OutputMany;
}

export namespace IPostUseCase {
  export type Input = post;
  export type InputId = { id: string };
  export type Output = Promise<postUseCaseResponse>;
  export type OutputMany = Promise<postUseCaseResponseMany>;
  export type DeleteOutput = Promise<Either<NotFoundError, { id: string }>>;
}
