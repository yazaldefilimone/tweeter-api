import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class FindAllUserController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    const usersOrError = await this.userUseCase.findAll();

    if (usersOrError.isLeft()) {
      return response.status(400).json({ message: usersOrError.value.message });
    }

    return response.status(200).json(usersOrError.value);
  }
}
