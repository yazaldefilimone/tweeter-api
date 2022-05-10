export type user = {
  name: string;
  email: string;
  password: string;
  bio: string;
  banner_url: string;
  avatar_url: string;
};

export type userStoreDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  banner_url: string;
  avatar_url: string;
  created_at: Date;
};
export type userResponse = {
  id: string;
  name: string;
  email: string;
  bio: string;
  banner_url: string;
  avatar_url: string;
  created_at: Date;
};
