import { User } from '@/domain/user/entity/user';
import { IUserUseCase } from '@/domain/user/use-cases';
import { IUserRepository } from '@/data/repositories/user';

import { left, right } from '@/shared/error-handler/either';
import { AlreadyExistsError, NotFoundError } from '@/domain/errors';
import { IEncoder } from '@/data/contracts/encoder';
import { InvalidPasswordError } from '@/domain/user/errors';
import { createJWT } from '@/shared/security';
import { ICacheServices } from '@/data/services/cache/ICacheServices';
import { buildType, userResponse, userStoreDTO } from '@/domain/user/dtos';
import { threadId } from 'worker_threads';
export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly encoder: IEncoder;
  private readonly cacheServices: ICacheServices;
  constructor(userRepository: IUserRepository, cacheServices: ICacheServices, encoder: IEncoder) {
    this.userRepository = userRepository;
    this.cacheServices = cacheServices;
    this.encoder = encoder;
  }

  private id(id: string) {
    return `user-${id}`;
  }
  async signup(data: IUserUseCase.signInput): IUserUseCase.signOutput {
    const build = new User().build(data);
    if (build.isLeft()) {
      return left(build.value);
    }

    const userBuilder = build.value;
    const isExists = await this.userRepository.findByEmail({ email: userBuilder.email });

    if (isExists) {
      return left(new AlreadyExistsError('user'));
    }
    userBuilder.password = await this.encoder.encode(userBuilder.password);

    const user = await this.userRepository.add(userBuilder);
    return right(user);
  }

  async login(data: IUserUseCase.loginInput): IUserUseCase.loginOutput {
    const user = {
      email: new User().isValidEmail(data.email),
      password: new User().isValidPassword(data.password),
    };

    if (user.email.isLeft()) {
      return left(user.email.value);
    }

    if (user.password.isLeft()) {
      return left(user.password.value);
    }

    const isUser = await this.userRepository.findByEmail({ email: user.email.value });

    if (!isUser) {
      return left(new NotFoundError('user'));
    }

    const isOwner = await this.encoder.decode(user.password.value, isUser.password);

    if (!isOwner) {
      return left(new InvalidPasswordError('password'));
    }
    const token = createJWT({ email: isUser.email, id: isUser.id });

    await this.cacheServices.setCache<userStoreDTO>({ key: this.id(isUser.id), data: isUser });

    return right({
      token,
      user: {
        id: isUser.id,
        name: isUser.name,
        email: isUser.email,
        bio: isUser.bio,
        avatar_url: isUser.avatar_url,
        banner_url: isUser.banner_url,
        website_url: isUser.website_url,
        localization: isUser.localization,
        birth_date: isUser.birth_date,
        created_at: isUser.created_at,
      },
    });
  }

  async updateProfile({ id, data }: IUserUseCase.updateInput): IUserUseCase.signOutput {
    const build = new User().build(data);
    if (build.isLeft()) {
      return left(build.value);
    }

    const isUser = await this.userRepository.findById({ id });
    if (!isUser) {
      return left(new NotFoundError('user'));
    }

    const passwordHash = await this.encoder.encode(build.value.password);

    const createUser = {
      name: build.value.name,
      email: build.value.email,
      bio: build.value.bio,
      password: passwordHash,
      website_url: data.website_url,
      localization: data.localization,
      birth_date: data.birth_date,
    };

    const user = await this.userRepository.update({ id, data: createUser });
    await this.cacheServices.removeCache(this.id(id));
    await this.cacheServices.setCache<buildType>({ key: this.id(id), data: { id, ...createUser, created_at: isUser.created_at } });

    return right(user);
  }
  async updateAvatar(data: { id: string; avatar: string }): IUserUseCase.updateOutput {
    const isExits = await this.userRepository.findById({ id: data.id });

    if (!isExits) {
      return left(new NotFoundError('user'));
    }

    const result = await this.userRepository.updateAvatar(data);
    await this.cacheServices.removeCache(this.id(result.id));
    await this.cacheServices.setCache<userResponse>({ key: this.id(result.id), data: result });
    return right({ id: result.id });
  }

  async updateBanner(data: { id: string; banner: string }): IUserUseCase.updateOutput {
    const isExits = await this.userRepository.findById({ id: data.id });

    if (!isExits) {
      return left(new NotFoundError('user'));
    }
    const result = await this.userRepository.updateBanner(data);
    await this.cacheServices.removeCache(this.id(result.id));
    await this.cacheServices.setCache<userResponse>({ key: this.id(result.id), data: result });
    return right({ id: result.id });
  }
  async findById({ id }: { id: string }): IUserUseCase.signOutput {
    const cache = await this.cacheServices.getCache<userResponse>(this.id(id));

    if (!cache) {
      let isUser = await this.userRepository.findById({ id });
      if (!isUser) {
        return left(new NotFoundError('user'));
      }
      console.log({ db: isUser });
      return right(isUser);
    }
    console.log({ cache });

    return right(cache);
  }
  async findAll({ page, limit }: { page: number; limit: number }): IUserUseCase.findOutput<userResponse[]> {
    const users = (await this.userRepository.find({ page, limit })) as userResponse[];
    if (!users) {
      right(new NotFoundError('users'));
    }

    return right(users);
  }

  async findByName({ name }: { name: string }): IUserUseCase.findOutput<userResponse[]> {
    const IsName = new User().isValidName(name);

    if (IsName.isLeft()) {
      return left(IsName.value);
    }

    const users = (await this.userRepository.findByName({ name: IsName.value })) as userResponse[];
    if (!users) {
      right(new NotFoundError('users'));
    }

    return right(users);
  }
  async deleteById({ id }: { id: string }): IUserUseCase.updateOutput {
    const isUser = this.userRepository.findById({ id });
    if (!isUser) {
      return left(new NotFoundError('user'));
    }
    const result = await this.userRepository.delete({ id });

    await this.cacheServices.removeCache(this.id(result.id));

    return right({ id: result.id });
  }
}
