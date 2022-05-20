import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class DeleteUserByIdController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    if (!request.body) {
      return response.status(204).json({ message: 'body is required' });
    }
    const { id } = request.body;

    const usersOrError = await this.userUseCase.deleteById({ id });

    if (usersOrError.isLeft()) {
      return response.status(400).json({ message: usersOrError.value.message });
    }

    return response.status(201).json(usersOrError.value);
  }
}
