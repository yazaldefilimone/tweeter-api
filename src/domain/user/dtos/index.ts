export type user = {
  name: string;
  email: string;
  password: string;
  bio: string;
  website_url: string | null;
  localization: string | null;
  birth_date: Date | null;
};

export type userStoreDTO = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  banner_url: string | null;
  avatar_url: string | null;
  website_url: string | null;
  localization: string | null;
  birth_date: Date | null;
  created_at: Date;
};
export type userResponse = {
  id: string;
  name: string;
  email: string;
  bio: string;
  banner_url: string | null;
  avatar_url: string | null;
  website_url: string | null;
  localization: string | null;
  birth_date: Date | null;
  created_at: Date;
};

export type userParam = {
  email: string;
  password: string;
};
export type userToken = {
  user: {
    id: string;
    name: string;
    email: string;
    bio: string;
    banner_url: string | null;
    avatar_url: string | null;
    website_url: string | null;
    localization: string | null;
    birth_date: Date | null;
    created_at: Date;
  };
  token: string;
};

export type userUpdateDTO = {
  id: string;
  data: {
    name: string;
    email: string;
    password: string;
    bio: string;
    website_url: string | null;
    localization: string | null;
    birth_date: Date | null;
  };
};
export type userUpdateInputDTO = {
  name: string;
  email: string;
  password: string;
  bio: string;
  website_url: string | null;
  localization: string | null;
  birth_date: Date | null;
  created_at: Date;
};

export type buildType = Omit<Omit<userStoreDTO, 'avatar_url'>, 'banner_url'>;
