import { IloginUserUseCase } from '@/domain/user/use-cases/Ilogin-user-usecase';
import { IuserRepository } from '@/data/protocols/repository/user';
import { IcompareHash } from '@/data/protocols/cryptography';
import { invalidParamError, notFoundError } from '@/domain/user/errors';

import { right, left } from '@/shared/error-handler/either';
import { createJWT } from '@/shared/webtoken';

export class LoginUserUseCase implements IloginUserUseCase {
  constructor(private readonly userRepository: IuserRepository, private readonly compatreHash: IcompareHash) {}
  async preform({ password, email }: IloginUserUseCase.Input): IloginUserUseCase.Output {
    const user = await this.userRepository.findOneByEmail({ email });

    if (!user) {
      return left(new notFoundError('user'));
    }

    const isValid = await this.compatreHash.compare({ password, passwordhash: user.password });

    if (!isValid) {
      return left(new invalidParamError('password'));
    }
    const token = createJWT({ id: user.id });

    const userauth = {
      user: {
        name: user.name,
        email: user.email,
        born: user.born,
        bio: user.bio,
        username: user.username,
        created_at: user.created_at,
      },
      token,
    };

    return right(userauth);
  }
}
