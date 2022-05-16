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
export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly encoder: IEncoder;
  private readonly cacheServices: ICacheServices;
  constructor(userRepository: IUserRepository, cacheServices: ICacheServices, encoder: IEncoder) {
    this.userRepository = userRepository;
    this.cacheServices = cacheServices;
    this.encoder = encoder;
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

    await this.cacheServices.setCache<userStoreDTO>({ key: `user-${isUser.id}`, data: isUser });

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
      website_url: isUser.website_url,
      localization: isUser.localization,
      birth_date: isUser.birth_date,
    };

    const user = await this.userRepository.update({ id, data: createUser });
    await this.cacheServices.removeCache(`user-${id}`);
    await this.cacheServices.setCache<buildType>({ key: `user-${id}`, data: { id, ...createUser } });

    return right(user);
  }
}
