import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class UpdateUserProfileController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, password, bio, website_url, localization, birth_date } = request.body;

    const userOrError = await this.userUseCase.updateProfile({
      id: request.userId,
      data: { name, email, password, website_url, bio, localization, birth_date },
    });

    if (userOrError.isLeft()) {
      return response.status(401).json({ message: userOrError.value.message });
    }

    return response.status(200).json(userOrError.value);
  }
}
