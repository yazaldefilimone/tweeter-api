import { CreateUserDto } from '@/domain/user/dtos';

export interface IuserRepository{
  findOneByEmail: ({ email }:{ email: string }) => Promise<IuserRepository.Output>;
  delete: ({ id }: { id:string }) => Promise<null>;
  findAll: () => Promise<IuserRepository.Output[]>;
  add: (data:IuserRepository.Output) => Promise<IuserRepository.Output>;
  update: (data:IuserRepository.Output) => Promise<IuserRepository.Output>
  findOneById: ({ id }: { id:string }) => Promise<IuserRepository.Output>;
}


export namespace IuserRepository{
  export type Output = CreateUserDto;
}
