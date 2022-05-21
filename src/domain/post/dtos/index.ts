export type post = {
  author_id: string;
  content?: string;
  banner_url?: string;
};

export type postStorage = {
  id: string;
  content?: string;
  author_id: string;
  banner_url?: string;
  likes: number;
  dislikes: number;
  created_at: Date;
};
