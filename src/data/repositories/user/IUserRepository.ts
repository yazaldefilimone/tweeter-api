import { buildType, user, userParam, userResponse, userStoreDTO, userUpdateDTO, userUpdateInputDTO } from '@/domain/user/dtos';

export interface IUserRepository {
  add: (data: IUserRepository.addInput) => IUserRepository.addOutput;
  findById: ({ id }: { id: string }) => IUserRepository.findOutput<userResponse>;
  findByName: ({ name }: { name: string }) => IUserRepository.findOutput<userResponse[]>;
  findByEmail: ({ email }: { email: string }) => IUserRepository.findOutput<userStoreDTO>;
  delete: ({ id }: { id: string }) => Promise<{ id: string }>;
  update: (data: userUpdateDTO) => IUserRepository.addOutput;
}

export namespace IUserRepository {
  export type addInput = buildType;
  export type updateInput = userUpdateDTO;
  export type addOutput = Promise<userResponse>;
  export type findOutput<T> = Promise<T | null>;
}
