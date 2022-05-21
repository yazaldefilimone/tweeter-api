import { User } from '@/domain/user/entity/user';
import { IUserUseCase } from '@/domain/user/use-cases';
import { IUserRepository } from '@/data/repositories/user';

import { left, right } from '@/shared/error-handler/either';
import { AlreadyExistsError, NotFoundError } from '@/domain/errors';
import { IEncoder } from '@/data/contracts/encoder';
import { InvalidPasswordError } from '@/domain/user/errors';
import { createJWT } from '@/shared/security';
import { ICacheServices } from '@/data/services/cache/ICacheServices';
import { UserDTO, UserStoredDTO } from '@/domain/user/dtos';
import { UserMappers } from '@/domain/user/mappers';
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

    const userBuild = build.value;
    const isExists = await this.userRepository.findByEmail({ email: userBuild.email });

    if (isExists) {
      return left(new AlreadyExistsError('user'));
    }
    userBuild.password = await this.encoder.encode(userBuild.password);

    const user = await this.userRepository.add(userBuild);
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

    const userOrNull = await this.userRepository.findByEmail({ email: user.email.value });

    if (!userOrNull) {
      return left(new NotFoundError('user'));
    }

    const isOwner = await this.encoder.decode(user.password.value, userOrNull.password);

    if (!isOwner) {
      return left(new InvalidPasswordError('password'));
    }
    const token = createJWT({ email: userOrNull.email, id: userOrNull.id });

    await this.cacheServices.setCache<UserStoredDTO>({ key: this.id(userOrNull.id), data: userOrNull });
    return right({
      token,
      user: userOrNull,
    });
  }

  async updateProfile({ id, data }: IUserUseCase.updateInput): IUserUseCase.signOutput {
    const build = new User().build(data);
    if (build.isLeft()) {
      return left(build.value);
    }

    const userOrNull = await this.userRepository.findById({ id });
    if (!userOrNull) {
      return left(new NotFoundError('user'));
    }

    const passwordHash = await this.encoder.encode(build.value.password);

    const createUser = {
      name: build.value.name,
      email: build.value.email,
      bio: build.value.bio,
      password: passwordHash,
      website: data.website,
      location: data.location,
      dateOfBirth: data.dateOfBirth,
    };

    const user = await this.userRepository.update({ id, data: createUser });
    await this.cacheServices.removeCache(this.id(id));
    await this.cacheServices.setCache<UserDTO>({ key: this.id(id), data: user });

    return right(user);
  }
  async updateAvatar(data: { id: string; avatar: string }): IUserUseCase.updateOutput {
    const isExits = await this.userRepository.findById({ id: data.id });

    if (!isExits) {
      return left(new NotFoundError('user'));
    }

    const result = await this.userRepository.updateAvatar(data);
    await this.cacheServices.removeCache(this.id(result.id));
    await this.cacheServices.setCache<UserDTO>({ key: this.id(result.id), data: result });
    return right({ id: result.id });
  }

  async updateBanner(data: { id: string; banner: string }): IUserUseCase.updateOutput {
    const isExits = await this.userRepository.findById({ id: data.id });

    if (!isExits) {
      return left(new NotFoundError('user'));
    }
    const result = await this.userRepository.updateBanner(data);
    await this.cacheServices.removeCache(this.id(result.id));
    await this.cacheServices.setCache<UserDTO>({ key: this.id(result.id), data: result });
    return right({ id: result.id });
  }
  async findById({ id }: { id: string }): IUserUseCase.signOutput {
    const cache = await this.cacheServices.getCache<UserDTO>(this.id(id));

    if (!cache) {
      let userOrNull = await this.userRepository.findById({ id });
      if (!userOrNull) {
        return left(new NotFoundError('user'));
      }
      console.log({ db: userOrNull });
      return right(userOrNull);
    }
    console.log({ cache });

    return right(cache);
  }
  async findAll({ page, limit }: { page: number; limit: number }): IUserUseCase.findOutput<UserDTO[]> {
    const users = (await this.userRepository.find({ page, limit })) as UserDTO[];
    if (!users) {
      right(new NotFoundError('users'));
    }

    return right(users);
  }

  async findByName({ name }: { name: string }): IUserUseCase.findOutput<UserDTO[]> {
    const IsName = new User().isValidName(name);

    if (IsName.isLeft()) {
      return left(IsName.value);
    }

    const users = (await this.userRepository.findByName({ name: IsName.value })) as UserDTO[];
    if (!users) {
      right(new NotFoundError('users'));
    }

    return right(users);
  }
  async deleteById({ id }: { id: string }): IUserUseCase.updateOutput {
    const userOrNull = this.userRepository.findById({ id });
    if (!userOrNull) {
      return left(new NotFoundError('user'));
    }
    const result = await this.userRepository.delete({ id });

    await this.cacheServices.removeCache(this.id(result.id));

    return right({ id: result.id });
  }
}
