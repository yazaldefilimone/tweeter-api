export type UserDto = {
  id?: string;
  name: string;
  email: string;
  cellphone?: string;
  username: string;
  bio: string;
  password: string;
  created_at: string;
  born: string;
};

export type CreateUserDto = {
  user: {
    id?: string;
    name: string;
    email: string;
    cellphone?: string;
    username: string;
    bio: string;
    born: string;
  };
  token: string;
};
export type UserLogin = {
  email: string;
  cellphone?: string;
  password: string;
};
export type ResultUserDto = Omit<UserDto, 'password'>;
