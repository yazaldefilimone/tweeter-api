import { IuserRepository } from '@/data/protocols/repository/user'
import { User } from '@/infra/postgres/entities'


export class InMemoryUserRepository implements IuserRepository{
  private db:Array<User>
  findOneByIdCallCount = 0
  deleteCallCount = 0
  findAllCallCount = 0
  addCallCount = 0
  updateCallCount = 0
  findOneByEmailCallCount = 0

  constructor(){ 
    this.db = [] 
  }
  
  async findOneById({ id }: { id:string }): Promise<IuserRepository.Output>{
    this.findOneByIdCallCount++
    const user = this.db.find(user => user.id === id);
      return user as User;
  }
  async findAll(): Promise<IuserRepository.Output[]>{
    this.findAllCallCount++
    return this.db
  }

  async delete({id}: {id: string;}):Promise<void>{
    this.deleteCallCount++
    this.db.forEach((user, index) => {
      if(user.id === id) {
        delete this.db[index];
      }
    })
  }

  async findOneByEmail({email}: {email: string;}): Promise<IuserRepository.Output | null>{
    this.findOneByEmailCallCount++
    const user = this.db.find(user => user.email === email);
    if(!user){
      return null;
    }
      return user;
  }

  async update(data: IuserRepository.Output): Promise<IuserRepository.Output>{
    this.updateCallCount++
    this.db.forEach((user, index) => {
      if(user.id === data.id){
        this.db[index] = data as User
      }
    })
    return data
  }

 async add(data: IuserRepository.Output): Promise<IuserRepository.Output>{
    this.addCallCount++
    this.db.push(data as User);

    return this.db[this.db.length - 1]
  }

}
