import { left, right } from '@/shared/error-handler/either';
import { alreadyExistsError } from '@/domain/user/errors';
import { IsigInUserUseCase } from '@/domain/user/use-cases';
import { IcreateHash } from '@/data/protocols/cryptography';
import { IuserRepository } from '@/data/protocols/repository/user';
import { User } from '@/domain/user/entity';


export class SigInUserUseCase implements IsigInUserUseCase{
  constructor(private readonly createHash:IcreateHash, private readonly userRepository:IuserRepository){}

  async preform(user: IsigInUserUseCase.Input): Promise<IsigInUserUseCase.Output>{
    const buildUser = new User().build(user);
    
    if(buildUser.isLeft()){
      return left(buildUser.value)
    }

    const exists =  await this.userRepository.findOneByEmail({ email: buildUser.value.email })

    if(exists){
      return left(new alreadyExistsError());
    }

    const passwordhash = await this.createHash.create({ password:buildUser.value.password })

    const isUser = {
      ...buildUser.value,
      password: passwordhash
    }

    const UserResponse = await this.userRepository.add(isUser);


    return right(UserResponse) 
  }
}
