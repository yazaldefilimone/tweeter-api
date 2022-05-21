import { IUserRepository } from '@/data/repositories/user';
import { user, userResponse, userStoreDTO, userUpdateDTO, userUpdateInputDTO } from '@/domain/user/dtos';
import { prismaClient } from '@/infra/prisma/settings';
import { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private readonly selectGetUsersSimpleData = {
    name: true,
    avatar_url: true,
    localization: true,
    birth_date: true,
  };
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async updateAvatar(data: { id: string; avatar: string }): IUserRepository.addOutput {
    const user = await this.prismaClient.user.update({
      where: { id: data.id },
      data: {
        avatar_url: data.avatar,
      },
    });
    return user;
  }

  async updateBanner(data: { id: string; banner: string }): IUserRepository.addOutput {
    const user = await this.prismaClient.user.update({
      where: { id: data.id },
      data: {
        banner_url: data.banner,
      },
    });
    return user;
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

  async update({ id, data }: userUpdateDTO): IUserRepository.addOutput {
    const user = await this.prismaClient.user.update({
      where: { id },
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

  async findByEmail({ email }: { email: string }): IUserRepository.findOutput<userStoreDTO> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findByName({ name }: { name: string }): IUserRepository.findOutput<userResponse[]> {
    const user = (await this.prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: this.selectGetUsersSimpleData,
      orderBy: {
        name: 'asc',
      },
      skip: 0,
      take: 15,
    })) as any;

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
  async find(data: any): IUserRepository.findOutput<userResponse[]> {
    const page = data.page < 1 ? 1 : data.page;
    const limit = data.limit < 1 ? 10 : data.limit;

    const users = await this.prismaClient.user.findMany({
      skip: (page - 1) * data.limit,
      take: limit,
      orderBy: { created_at: 'desc' },
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
    return users;
  }
}
