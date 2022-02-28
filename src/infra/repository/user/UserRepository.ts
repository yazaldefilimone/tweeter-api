import { getRepository, Repository } from 'typeorm'
import { IuserRepository } from '@/data/protocols/repository/user';
import { User } from '@/infra/postgres/entities/User'



export class UserRepository implements IuserRepository{
  private userRepo: Repository<User>
  constructor(){
    this.userRepo = getRepository(User)
  }

  async findAll(): Promise<IuserRepository.Output[]>{
    const users = await this.userRepo.find();

    return users;
  }


  async findOneById({ id }: { id: string; }): Promise<IuserRepository.Output | null>{
    const userOrNull = await this.userRepo.findOne({ id });

    if(!userOrNull){
      return null;
    }

    return userOrNull as IuserRepository.Output
  }
 
  async findOneByEmail({ email }: { email: string; }): Promise<IuserRepository.Output | null >{
    const userOrNull = await this.userRepo.findOne({ email });

    if(!userOrNull){
      return null;
    }

    return userOrNull as IuserRepository.Output

  }

  async add(data: IuserRepository.Output): Promise<IuserRepository.Output>{
    const isUser = this.userRepo.create(data);

    await this.userRepo.save(isUser);

    return isUser;
  }
 
  async update(data: IuserRepository.Output): Promise<IuserRepository.Output>{
    await this.userRepo.save(data);
    return data;
  }

  async delete({ id }: { id: string }): Promise<void>{
    await this.userRepo.delete({ id });
  }

}
