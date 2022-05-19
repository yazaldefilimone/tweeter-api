import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class FindByNameUserController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    if (!request.params) {
      return response.status(204).json({ message: 'param is required' });
    }
    const data = request.params;
    const userOrError = await this.userUseCase.findByName({ name: data.name });

    if (userOrError.isLeft()) {
      return response.status(400).json({ message: userOrError.value.message });
    }

    return response.status(201).json({
      ...userOrError.value,
    });
  }
}
