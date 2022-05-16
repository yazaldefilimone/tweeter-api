import { IUserRepository } from '@/data/repositories/user';
import { user, userResponse, userStoreDTO } from '@/domain/user/dtos';
import { prismaClient } from '@/infra/prisma/settings';
import { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async findById({ id }: { id: string }): IUserRepository.findOutput<userResponse> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        banner_url: true,
        avatar_url: true,
        website_url: true,
        localization: true,
        birth_date: true,
        created_at: true,
      },
    });
    return user;
  }

  async add(data: IUserRepository.addInput): IUserRepository.addOutput {
    const user = await this.prismaClient.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        password: false,
        banner_url: true,
        avatar_url: true,
        website_url: true,
        localization: true,
        birth_date: true,
        created_at: true,
      },
    });
    return user;
  }

  async update(data: IUserRepository.updateInput): IUserRepository.addOutput {
    const user = await this.prismaClient.user.update({
      where: { id: data.id },
      data,
    });
    return user;
  }

  async findByEmail({ email }: { email: string }): IUserRepository.findOutput<userStoreDTO> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findByName({ name }: { name: string }): IUserRepository.findOutput<userResponse[]> {
    const user = await this.prismaClient.user.findMany({
      where: { name },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        banner_url: true,
        avatar_url: true,
        website_url: true,
        localization: true,
        birth_date: true,
        created_at: true,
      },
    });

    return user;
  }

  async delete({ id }: { id: string }): Promise<{ id: string }> {
    const user = await this.prismaClient.user.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return user;
  }
}
