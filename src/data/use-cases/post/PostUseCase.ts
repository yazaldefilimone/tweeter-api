import { IPostRepository } from '@/data/repositories/post';
import { ICacheServices } from '@/data/services/cache/ICacheServices';
import { Post } from '@/domain/post/entity/post';
import { IPostUseCase } from '@/domain/post/use-cases';
import { left, right } from '@/shared/error-handler/either';

export class PostUseCase implements IPostUseCase {
  private readonly postRepository: IPostRepository;
  private readonly cacheServices: ICacheServices;
  constructor(postRepository: IPostRepository, cacheServices: ICacheServices) {
    this.postRepository = postRepository;
    this.cacheServices = cacheServices;
  }

  async create(data: IPostUseCase.Input): IPostUseCase.Output {
    const build = new Post().build(data);
    if (build.isLeft()) {
      return left(build.value);
    }
    const post = build.value;

    const postStore = await this.postRepository.add(post);
    this.cacheServices.setCache({ key: `post-${postStore.id}`, data: data });
    return right(postStore);
  }
}
