import { User } from '@/domain/user/entity/user';
import { IUserUseCase } from '@/domain/user/use-cases';
import { IUserRepository } from '../repositories/user';

import { left, right } from '@/shared/error-handler/either';
import { AlreadyExistsError, NotFoundError } from '@/domain/errors';
import { IEncoder } from '../contracts/encoder';
import { InvalidPasswordError } from '@/domain/user/errors';
import { createJWT } from '@/shared/security';
export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly encoder: IEncoder;
  constructor(userRepository: IUserRepository, encoder: IEncoder) {
    this.userRepository = userRepository;
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

    return right({
      token,
      user: isUser,
    });
  }
}
