import { UserBuildDTO, UserBuildResponseDTO, UserDTO, UserStoredDTO } from '@/domain/user/dtos';

export interface IUserRepository {
  add: (data: IUserRepository.addInput) => IUserRepository.addOutput;
  find: ({ page, limit }: { page: number; limit: number }) => IUserRepository.findOutput<UserDTO[]>;
  findById: ({ id }: { id: string }) => IUserRepository.findOutput<UserDTO>;
  findByName: ({ name }: { name: string }) => IUserRepository.findOutput<UserDTO[]>;
  findByEmail: ({ email }: { email: string }) => IUserRepository.findOutput<UserStoredDTO>;
  delete: ({ id }: { id: string }) => Promise<{ id: string }>;
  update: (data: IUserRepository.updateInput) => IUserRepository.addOutput;
  updateAvatar: (data: { id: string; avatar: string }) => IUserRepository.updateAssets;
  updateBanner: (data: { id: string; banner: string }) => IUserRepository.updateAssets;
}

export namespace IUserRepository {
  export type updateAssets = Promise<UserDTO>;
  export type addInput = UserBuildResponseDTO;
  export type updateInput = { id: string; data: UserBuildDTO };
  export type addOutput = Promise<UserDTO>;
  export type findOutput<T> = Promise<T | null>;
}
