import { SearchUserUseCase } from '@/data/use-cases/user';
import { UserRepository } from '@/infra/repository/user';

export const searchUseCaseFactore = () => {
  const userRepository = new UserRepository();
  const searchUseCase = new SearchUserUseCase(userRepository);
  return searchUseCase;
};
