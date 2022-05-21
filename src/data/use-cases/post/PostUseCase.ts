import { IPostRepository } from '@/data/repositories/post';
import { IUserRepository } from '@/data/repositories/user';
import { ICacheServices } from '@/data/services/cache/ICacheServices';
import { NotFoundError } from '@/domain/errors';
import { postStorage } from '@/domain/post/dtos';
import { Post } from '@/domain/post/entity/post';
import { IPostUseCase } from '@/domain/post/use-cases';
import { left, right } from '@/shared/error-handler/either';

export class PostUseCase implements IPostUseCase {
  private readonly postRepository: IPostRepository;
  private readonly userRepository: IUserRepository;
  private readonly cacheServices: ICacheServices;
  constructor(postRepository: IPostRepository, cacheServices: ICacheServices, userRepository: IUserRepository) {
    this.postRepository = postRepository;
    this.cacheServices = cacheServices;
    this.userRepository = userRepository;
  }

  private id(id: string): string {
    return `post-${id}`;
  }

  async create(data: IPostUseCase.Input): IPostUseCase.Output {
    const build = new Post().build(data);
    if (build.isLeft()) {
      return left(build.value);
    }
    const post = build.value;

    const postStore = await this.postRepository.add(post);
    this.cacheServices.setCache({ key: this.id(postStore.id), data: data });
    return right(postStore);
  }

  async findById({ id }: IPostUseCase.InputId): IPostUseCase.Output {
    const cache = await this.cacheServices.getCache<postStorage>(this.id(id));
    if (cache) {
      return right(cache);
    }
    const post = await this.postRepository.findById({ id });
    if (!post) {
      return left(new NotFoundError('post'));
    }

    return right(post);
  }

  async findByUserId(data: { userId: string; limit: number; page: number }): IPostUseCase.OutputMany {
    const user = this.userRepository.findById({ id: data.userId });

    if (!user) {
      return left(new NotFoundError('user'));
    }
    const posts = await this.postRepository.findByUser(data);

    return right(posts);
  }
  async find(data: { limit: number; page: number }): IPostUseCase.OutputMany {
    const posts = await this.postRepository.find(data);
    return right(posts);
  }

  async deleteById(data: { id: string; userId: string }): IPostUseCase.DeleteOutput {
    const user = this.userRepository.findById({ id: data.userId });

    if (!user) {
      return left(new NotFoundError('user'));
    }
    const post = await this.postRepository.delete({ id: data.id });
    await this.cacheServices.removeCache(this.id(post.id));
    return right(post);
  }
}
