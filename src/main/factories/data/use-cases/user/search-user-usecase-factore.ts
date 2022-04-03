import { SearchUserUseCase } from '@/data/use-cases/user';
import { UserRepository } from '@/infra/repository/user';

export const searchUserUseCaseFactore = () => {
  const userRepository = new UserRepository();
  const searchUseCase = new SearchUserUseCase(userRepository);
  return searchUseCase;
};
