import { SearchUserUseCase } from '@/data/use-cases/user';
import { UserRepository } from '@/infra/repository/user';

export const SearchUseCaseFactore = () => {
  const userRepository = new UserRepository();
  const SearchUseCase = new SearchUserUseCase(userRepository);
  return SearchUseCase;
};
