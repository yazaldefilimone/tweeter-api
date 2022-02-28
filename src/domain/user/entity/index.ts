import { Either, right, left } from '@/shared/error-handler/either'
import { CreateUserFailure, CreateEntityUserReponse } from './protocols'
import { UserObjectValue } from '@/domain/user/object-value';
import { UserDto } from '@/domain/user/dtos'



type CreateObject = {
  [key:string]: Either<Error, string> 
}


export class User{
  private userValueObject: UserObjectValue;
  constructor(){
    this.userValueObject  = new  UserObjectValue()
  }
  
  public build(user:UserDto): CreateEntityUserReponse{
    
    const ValueUserOrError:CreateObject = {
      name:this.userValueObject.Name(user.name),
      email:this.userValueObject.Email(user.email),
      born:this.userValueObject.Born(user.born),
      bio:this.userValueObject.Bio(user.bio),
      username:this.userValueObject.UserName(user.username),
      password:this.userValueObject.Password(user.password)
    }

    const { name, email, bio, born, username, password } = ValueUserOrError;

    if(name.isLeft()) return left(name.value);

    if(email.isLeft()) return left(email.value);

    if(bio.isLeft()) return left(bio.value);

    if(born.isLeft()) return left(born.value);

    if(username.isLeft()) return left(username.value);

    if(password.isLeft()) return left(password.value);
  

    return  right({
      name: name.value,
      email:email.value,
      born:born.value,
      bio:bio.value,
      username:username.value,
      password:password.value,
      created_at: Date.now().toString(),
    })
  }
}
