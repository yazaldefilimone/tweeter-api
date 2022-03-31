import { LoginUserController } from "@/presentation/controllers/user";
import { loginUserUseCaseFactore } from "@/main/factories/data/use-cases/user";

export const loginUserControllerFactore = () => {
  const loginUserUseCase = loginUserUseCaseFactore();
  const loginUserController = new LoginUserController(loginUserUseCase);
  return loginUserController;
};
