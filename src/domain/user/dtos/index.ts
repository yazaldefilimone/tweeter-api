export type UserDto = {
  name:string;
  email:string;
  cellphone?:string;
  username:string;
  bio:string;
  password:string;
  born:string;
}

export type CreateUserDto = {
  id?:string;
  name:string;
  email:string;
  cellphone?:string;
  username:string;
  bio:string;
  password:string;
  born:string;
  created_at:string;
}
export type UserLogin = {
  email:string;
  cellphone?:string;
  password:string;
}
export type ResultUserDto = Omit<UserDto, 'password'>
