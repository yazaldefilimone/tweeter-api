import { IsigInUserUseCase } from "@/domain/user/use-cases";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { Icontroller } from "@/presentation/protocols";

export class LoginUserController implements Icontroller {
  constructor(private readonly loginUserUseCase: IsigInUserUseCase) {}

  async execute(input: Icontroller.Input): Icontroller.Output {
    try {
      const result = await this.loginUserUseCase.preform(input.body);

      if (result.isLeft()) {
        return badRequest(result.value);
      }

      return ok(result.value);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
