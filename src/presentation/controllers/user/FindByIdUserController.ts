import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class FindByIdUserController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    if (!request.body) {
      return response.status(204).json({ message: 'body is required' });
    }
    const data = request.params;
    const userOrError = await this.userUseCase.findById({ id: data.id });

    if (userOrError.isLeft()) {
      return response.status(400).json({ message: userOrError.value.message });
    }

    return response.status(200).json({
      ...userOrError,
    });
  }
}
