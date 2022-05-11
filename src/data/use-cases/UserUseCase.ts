import { User } from '@/domain/user/entity/user';
import { IUserUseCase } from '@/domain/user/use-cases';
import { IUserRepository } from '../repositories/user';

import { left, right } from '@/shared/error-handler/either';
import { AlreadyExistsError } from '@/domain/errors';
export class UserUseCase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
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

    const user = await this.userRepository.add(userBuilder);
    return right(user);
  }
}
