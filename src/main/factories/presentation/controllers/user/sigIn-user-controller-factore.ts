import { sigInUserUseCaseFactore } from '@/main/factories/data/use-cases/user';
import { SigInUserController } from '@/presentation/controllers/user';

export const sigInUserControllerFactore = () => {
  const sigInUserUseCase = sigInUserUseCaseFactore();
  const sigInUserController = new SigInUserController(sigInUserUseCase)
  return sigInUserController
}
