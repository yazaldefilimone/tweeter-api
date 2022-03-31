import { SigInUserUseCase } from "@/data/use-cases/user";
import { CreateHash } from "@/infra/cryptography";
import { UserRepository } from "@/infra/repository/user";

export const loginUserUseCaseFactore = () => {
  const createHash = new CreateHash();
  const userRepository = new UserRepository();
  const sigInUserUseCase = new SigInUserUseCase(createHash, userRepository);
  return sigInUserUseCase;
};
