import { SearchUserController } from '@/presentation/controllers/user';
import { searchUserUseCaseFactore } from '@/main/factories/data/use-cases/user';

export const SearchUserControllerFactore = () => {
  const searchUserUseCase = searchUserUseCaseFactore();
  const searchUserController = new SearchUserController(searchUserUseCase);
  return searchUserController;
};
