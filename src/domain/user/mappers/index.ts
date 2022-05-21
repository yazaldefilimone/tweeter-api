import {
  UserBuildResponseDTO,
  UserCreateDTO,
  UserDbStoredDTO,
  UserDbStoredNotPasswordDTO,
  UserDTO,
  UserSimpleDTO,
  UserStoredDTO,
} from '../dtos';

export class UserMappers {
  static toCreateUserDTO(params: any): UserCreateDTO {
    return {
      email: params.email,
      password: params.password,
      name: params.name,
      avatarUrl: params.avatarUrl,
      bio: params.bio,
    };
  }

  static fromDbToUserStoredDTO(params: UserDbStoredDTO): UserStoredDTO {
    return {
      id: params.id,
      email: params.email,
      name: params.name,
      bio: params.bio,
      password: params.password,
      createdAt: params.created_at.toISOString(),
      website: params.website,
      dateOfBirth: params.date_of_birth.toISOString(),
      location: params.location,
      bannerUrl: params.banner_url,
      avatarUrl: params.avatar_url,
    };
  }

  static toUserDTO(params: UserDbStoredNotPasswordDTO): UserDTO {
    return {
      id: params.id,
      email: params.email,
      name: params.name,
      bio: params.bio,
      website: params.website,
      dateOfBirth: params.date_of_birth.toISOString(),
      location: params.location,
      bannerUrl: params.banner_url,
      avatarUrl: params.avatar_url,
      createdAt: params.created_at.toISOString(),
    };
  }

  static toUserResponseDTO(params: UserDbStoredDTO): UserDTO {
    return {
      id: params.id,
      email: params.email,
      name: params.name,
      bio: params.bio,
      website: params.website,
      dateOfBirth: params.date_of_birth.toISOString(),
      location: params.location,
      bannerUrl: params.banner_url,
      avatarUrl: params.avatar_url,
      createdAt: params.created_at.toISOString(),
    };
  }

  // static fromDbToUserSimpleDTO(params: any): UserSimpleDTO {
  //   return {
  //     name: params.name,
  //     email: params.email,
  //     location: params.location,
  //     avatarUrl: params.avatar_url,
  //     createdAt: params.created_at,
  //   };
  // }
}
