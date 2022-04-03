import { Either, left, right } from '@/shared/error-handler/either';
import { PostDTO } from '../dtos';
import { PostObjectValue } from '../object-value';
import { PostResponse } from './protocols';

type CreateObject = {
  [key: string]: Either<Error, string>;
};

export class Post {
  private readonly postValueObject: PostObjectValue;
  constructor() {
    this.postValueObject = new PostObjectValue();
  }

  public build(post: PostDTO): PostResponse {
    const ValuepostOrError: CreateObject = {
      name: this.postValueObject.Name(post.user.name),
      username: this.postValueObject.UserName(post.user.username),
      message: this.postValueObject.PostContent(post.message),
      // refs: this.postValueObject.Refs(post.message),
      photo: this.postValueObject.Photo(post.photo),
    };

    const { name, username, message, photo } = ValuepostOrError;

    if (name.isLeft()) return left(name.value);

    if (username.isLeft()) return left(username.value);

    // if (message.isLeft()) return left(message.value);

    // if (photo.isLeft()) return left(photo.value);

    const currentdate = new Date().toISOString();

    return right({
      user: {
        name: name.value,
        username: username.value,
      },
      message: message.value as string,
      created_at: currentdate,
      photo: photo.value as string,
      // ref: [
      // {
      //   username: '@joeDio',
      // },
      // ],
    });
  }
}
