import { CreateUserDto } from "@/domain/user/dtos";

export interface IuserRepository {
  findOneByEmail: ({ email, }: { email: string }) => Promise<IuserRepository.Output | null>;
  delete: ({ id }: { id: string }) => Promise<void>;
  findAll: () => Promise<IuserRepository.Output[]>;
  add: (data: IuserRepository.Output) => Promise<IuserRepository.Output>;
  update: (data: IuserRepository.Output) => Promise<IuserRepository.Output>;
  findOneById: ({ id }: { id: string }) => Promise<IuserRepository.Output | null>;
  findByUserName: ({ username }: { username: string }) => Promise<IuserRepository.Output | null>;
  findByName: ({ name }: { name: string }) => Promise<IuserRepository.Output | null>;
}

export namespace IuserRepository {
  export type Output = CreateUserDto;
}
