import { LoginUserUseCase } from "@/data/use-cases/user";
import { CompareHash } from "@/infra/cryptography";
import { UserRepository } from "@/infra/repository/user";

export const loginUserUseCaseFactore = () => {
  const compareHash = new CompareHash();
  const userRepository = new UserRepository();
  const loginUserUseCase = new LoginUserUseCase(userRepository, compareHash);
  return loginUserUseCase;
};
