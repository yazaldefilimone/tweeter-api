import { PostDTO } from '@/domain/post/dtos';

export interface IpostRepository {
  delete: ({ id }: { id: string }) => Promise<void>;
  findAll: () => Promise<IpostRepository.Output[]>;
  add: (data: IpostRepository.Input) => Promise<IpostRepository.Output>;
  update: (data: IpostRepository.Input) => Promise<IpostRepository.Output>;
  findOneById: ({ id }: { id: string }) => Promise<IpostRepository.Output | null>;
}

export namespace IpostRepository {
  export type Output = PostDTO;
  export type Input = Omit<PostDTO, 'user'>;
}
