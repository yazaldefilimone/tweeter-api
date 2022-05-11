import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class LoginUserController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    if (!request.body) {
      return response.status(204).json({ message: 'body is required' });
    }
    const data = request.body;
    const userOrError = await this.userUseCase.login(data);

    if (userOrError.isLeft()) {
      return response.status(400).json({ message: userOrError.value.message });
    }

    return response.status(201).json({
      ...userOrError.value,
    });
  }
}
