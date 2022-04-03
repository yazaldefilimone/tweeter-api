import { IsearchUserUseCase } from '@/domain/user/use-cases';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import { Icontroller } from '@/presentation/protocols';

export class SearchUserController implements Icontroller {
  constructor(private readonly searchUserUseCase: IsearchUserUseCase) {}
  async execute(input: Icontroller.Input): Icontroller.Output {
    try {
      const userOrError = await this.searchUserUseCase.preform(input.body);

      if (userOrError.isLeft()) {
        return badRequest(userOrError.value);
      }

      return ok(userOrError.value);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
