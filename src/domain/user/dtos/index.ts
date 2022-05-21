export type UserCreateDTO = {
  email: string;
  name: string;
  password: string;
  avatarUrl: string;
  bio: string;
};

export type UserBuildDTO = {
  name: string;
  email: string;
  password: string;
  website: string | null;
  location: string;
  dateOfBirth: Date;
  bio: string;
};

export type UserBuildResponseDTO = {
  id: string;
  email: string;
  password: string;
  name: string;
  website: string | null;
  location: string;
  date_of_birth: Date;
  bio: string;
  created_at: Date;
};

export type UserStoredDTO = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  website: string | null;
  location: string;
  dateOfBirth: string;
  bio: string;
  createdAt: string;
};

export type UserDbStoredDTO = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar_url: string | null;
  banner_url: string | null;
  website: string | null;
  location: string;
  date_of_birth: Date;
  bio: string;
  created_at: Date;
};
export type UserDbStoredNotPasswordDTO = Omit<UserDbStoredDTO, 'password'>;

export type UserProfileDTO = {
  name: string | undefined;
  website: string | undefined;
  location: string;
  date_of_birth: string;
  bio: string | undefined;
};

export type UserSimpleDTO = {
  password: string;
  email: string;
};

export type UserDTO = Omit<UserStoredDTO, 'password'>;
