import { IcreatePostUseCase } from '@/domain/post/use-cases';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import { Icontroller } from '@/presentation/protocols';

export class CreatePostcontroller implements Icontroller {
  constructor(private readonly createPostUseCase: IcreatePostUseCase) {}
  async execute(Input: Icontroller.Input): Icontroller.Output {
    try {
      const user = await this.createPostUseCase.perform(Input.body);

      if (user.isLeft()) {
        return badRequest(user.value);
      }

      return ok(user.value);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
