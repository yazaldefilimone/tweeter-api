import { IUserUseCase } from '@/domain/user/use-cases';
import { serializePagination } from '@/shared/utils/serializePagination';
import { Request, Response } from 'express';

export class FindAllUserController {
  private readonly userUseCase: IUserUseCase;
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  async execute(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query;

    const paginationProps = serializePagination({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    const usersOrError = await this.userUseCase.findAll(paginationProps);

    if (usersOrError.isLeft()) {
      return response.status(400).json({ message: usersOrError.value.message });
    }

    return response.status(200).json(usersOrError.value);
  }
}
