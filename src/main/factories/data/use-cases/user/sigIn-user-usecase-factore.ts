import { SigInUserUseCase } from '@/data/use-cases/user';
import { CreateHash } from '@/infra/cryptography'
import { UserRepository } from '@/infra/repository/user'


export const sigInUserUseCaseFactore = () => {
  const userRepository = new UserRepository();
  const createHash = new CreateHash();
  const sigInUserUseCase = new SigInUserUseCase(createHash, userRepository);

  return sigInUserUseCase;
}
