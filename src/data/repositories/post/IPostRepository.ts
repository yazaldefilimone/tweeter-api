import { post } from '@/domain/post/dtos';
import { postUseCaseSuccess, postUseCaseSuccessMany } from '@/domain/post/use-cases/contracts';

export interface IPostRepository {
  add: (data: IPostRepository.addInput) => IPostRepository.addOutput;
  find: () => IPostRepository.findMany;
  findById: ({ id }: { id: string }) => IPostRepository.findOutput;
  findByUser: (data: { userId: string; page: number; limit: number }) => IPostRepository.findMany;
  delete: ({ id }: { id: string }) => Promise<{ id: string }>;
  update: (data: { id: string; userId: string; content: string; banner_url: string }) => IPostRepository.addOutput;
}

export namespace IPostRepository {
  export type updateAssets = Promise<{ id: string }>;
  export type addInput = post;
  export type findMany = Promise<postUseCaseSuccessMany | null>;
  export type addOutput = Promise<postUseCaseSuccess>;
  export type findOutput = Promise<postUseCaseSuccessMany | null>;
}
