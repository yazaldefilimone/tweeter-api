import { IUserRepository } from '@/data/repositories/user';
import { UserDTO, UserStoredDTO } from '@/domain/user/dtos';
import { UserMappers } from '@/domain/user/mappers';
import { prismaClient } from '@/infra/prisma/settings';
import { PrismaClient, User } from '@prisma/client';

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  private readonly selectGetUsersSimpleData = {
    name: true,
    avatar_url: true,
    location: true,
    date_of_birth: true,
  };
  private readonly selectGetUsersNotPassword = {
    id: true,
    name: true,
    email: true,
    bio: true,
    banner_url: true,
    avatar_url: true,
    website: true,
    location: true,
    date_of_birth: true,
    created_at: true,
  };

  async updateAvatar(data: { id: string; avatar: string }): IUserRepository.addOutput {
    const userRepo = await this.prismaClient.user.update({
      where: { id: data.id },
      data: {
        avatar_url: data.avatar,
      },
    });
    const user = UserMappers.toUserResponseDTO(userRepo);

    return user;
  }

  async updateBanner(data: { id: string; banner: string }): IUserRepository.addOutput {
    const userRepo = await this.prismaClient.user.update({
      where: { id: data.id },
      data: {
        banner_url: data.banner,
      },
    });
    const user = UserMappers.toUserResponseDTO(userRepo);

    return user;
  }

  async findById({ id }: { id: string }): IUserRepository.findOutput<UserDTO> {
    const userRepo = await this.prismaClient.user.findUnique({
      where: { id },
      select: this.selectGetUsersNotPassword,
    });

    if (!userRepo) {
      return userRepo;
    }

    const user = UserMappers.toUserDTO(userRepo);

    return user;
  }

  async add(data: IUserRepository.addInput): IUserRepository.addOutput {
    const userRepo = await this.prismaClient.user.create({
      data,
      select: this.selectGetUsersNotPassword,
    });
    const user = UserMappers.toUserDTO(userRepo);

    return user;
  }

  async update({ id, data }: IUserRepository.updateInput): IUserRepository.addOutput {
    const userRepo = await this.prismaClient.user.update({
      where: { id },
      data,
      select: this.selectGetUsersNotPassword,
    });

    const user = UserMappers.toUserDTO(userRepo);

    return user;
  }

  async findByEmail({ email }: { email: string }): IUserRepository.findOutput<UserStoredDTO> {
    const userRepo = await this.prismaClient.user.findUnique({
      where: { email },
    });

    if (!userRepo) {
      return userRepo;
    }
    const user = UserMappers.fromDbToUserStoredDTO(userRepo);

    return user;
  }

  async findByName({ name }: { name: string }): IUserRepository.findOutput<UserStoredDTO[]> {
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
  async find(data: any): IUserRepository.findOutput<UserDTO[]> {
    const page = data.page < 1 ? 1 : data.page;
    const limit = data.limit < 1 ? 10 : data.limit;

    const usersRepo = await this.prismaClient.user.findMany({
      skip: (page - 1) * data.limit,
      take: limit,
      orderBy: { created_at: 'desc' },
      select: this.selectGetUsersNotPassword,
    });

    const users = usersRepo.map((user) => UserMappers.toUserDTO(user));

    return users;
  }
}
