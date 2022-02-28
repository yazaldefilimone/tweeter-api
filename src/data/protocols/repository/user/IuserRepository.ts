import { CreateUserDto } from '@/domain/user/dtos';

export interface IuserRepository{
  findOneByEmail: ({ email }:IuserRepository.Input) => Promise<IuserRepository.Output>;
  delete: ({ id }: IuserRepository.Input) => Promise<null>;
  findAll: () => Promise<IuserRepository.Output[]>;
  add: (data:IuserRepository.Output) => Promise<IuserRepository.Output>;
  update: (data:IuserRepository.Output) => Promise<IuserRepository.Output>
  findOneById: ({ id }: IuserRepository.Input) => Promise<IuserRepository.Output>;
}


export namespace IuserRepository{
  export type Output = CreateUserDto;
  export type Input = {
    id:string;
    email:string;
  }
}
