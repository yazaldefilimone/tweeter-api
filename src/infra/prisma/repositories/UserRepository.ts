import { IUserRepository } from '@/data/repositories/user';
import { user, userResponse } from '@/domain/user/dtos';
import { prismaClient } from '@/infra/prisma/settings';

export class UserRepository implements IUserRepository {
  private prismaClient: any;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async findById({ id }: { id: string }): IUserRepository.findOutput<userResponse> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        banner_url: true,
        avatar_url: true,
        created_at: true,
      },
    });
    return user;
  }

  async add(data: user): IUserRepository.addOutput {
    const user = await prismaClient.user.create({
      data,
    });
    return user;
  }

  async update(data: IUserRepository.updateInput): IUserRepository.addOutput {
    const user = await prismaClient.user.update({
      where: {
        id: data.id,
      },
      data,
    });
    return user;
  }
}
