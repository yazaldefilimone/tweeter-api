import { IuserRepository } from '@/data/protocols/repository/user';
import { invalidParamError, notFoundError } from '@/domain/errors';
import { IsearchUserUseCase } from '@/domain/user/use-cases';
import { left, right } from '@/shared/error-handler/either';

export class SearchUserUseCase implements IsearchUserUseCase {
  constructor(private readonly userRepository: IuserRepository) {}
  async preform(data: IsearchUserUseCase.Input): IsearchUserUseCase.Output {
    const isUser = data.name ? data.name : data.username;

    if (!isUser) {
      return left(new invalidParamError('name or username'));
    }

    if (data.name) {
      const user = await this.userRepository.findByName({ name: data.name });
      return user ? right(user) : left(new notFoundError('user'));
    }

    const user = await this.userRepository.findByUserName({
      username: data.username,
    });

    return user ? right(user) : left(new notFoundError('user'));
  }
}
