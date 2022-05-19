import { IUserUseCase } from '@/domain/user/use-cases';
import { Request, Response } from 'express';

export class UpdateBannerController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      return response.status(204).json({ message: 'file is required' });
    }

    const fileOrUndefined = request.file;
    const userId = request.userId;

    if (!fileOrUndefined) {
      return response.status(400).send({ message: 'Image file is required' });
    }

    const fileSavedName = fileOrUndefined.filename;

    const userOrError = await this.userUseCase.updateBanner({ banner: fileSavedName, id: userId });

    if (userOrError.isLeft()) {
      return response.status(401).json({ message: userOrError.value.message });
    }
    return response.status(200).send({
      banner_url: fileSavedName,
    });
  }
}
