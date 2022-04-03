import { IpostRepository } from '@/data/protocols/repository/post';
import { IuserRepository } from '@/data/protocols/repository/user';
import { invalidParamError } from '@/domain/errors';
import { Post } from '@/domain/post/entity/Post';
import { IcreatePostUseCase } from '@/domain/post/use-cases';
import { left, right } from '@/shared/error-handler/either';

export class CreatePostUseCase implements IcreatePostUseCase {
  constructor(private readonly postRepo: IpostRepository, private readonly userRepo: IuserRepository) {}

  async perform(data: IcreatePostUseCase.Input): IcreatePostUseCase.OutPut {
    const user = await this.userRepo.findOneById({ id: data.id });

    if (!user) return left(new invalidParamError('user'));

    const post = new Post().build({ user: { username: user.username, name: user.name }, ...data });
    const isValid = data.content ? data.content : data.photo;

    if (!isValid) return left(new invalidParamError('post'));

    if (post.isLeft()) return left(new invalidParamError('post'));

    return right(post.value);
  }
}
