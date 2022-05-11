import { user, userParam, userResponse } from '@/domain/user/dtos';

export interface IUserRepository {
  add: (data: IUserRepository.addInput) => IUserRepository.addOutput;
  findById: ({ id }: { id: string }) => IUserRepository.addOutput;
  findByName: ({ name }: { name: string }) => IUserRepository.findOutput<userResponse[]>;
  findByEmail: ({ email }: { email: string }) => IUserRepository.findOutput<userResponse>;
  delete: ({ id }: { id: string }) => Promise<{ id: string }>;
  update: (data: IUserRepository.addInput) => IUserRepository.addOutput;
}

export namespace IUserRepository {
  export type addInput = user;
  export type addOutput = Promise<userResponse>;
  export type findOutput<T> = Promise<T | undefined>;
}
