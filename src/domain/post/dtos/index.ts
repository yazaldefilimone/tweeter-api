type User = {
  name: string;
  username: string;
  photo?: string;
};

type Ref = {
  username: string;
};

export type PostDTO = {
  user: User;
  message?: string;
  photo?: string;
  ref: Ref[];
};
export type CreatePostDTO = {
  id: string;
  user: User;
  message?: string;
  photo?: string;
  ref: Ref[];
};
