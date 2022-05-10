import { InvalidParamError } from '@/domain/errors/InvalidParamError';
import { Either, right, left } from '@/shared/error-handler/either';
import { isValidEmail, isValidName, isValidPassword, isValidBio } from '@/shared/validators';
import { randomUUID } from 'crypto';
import { user, userStoreDTO } from '../dtos';

type ObjectsBuildType = {
  [key: string]: Either<Error, string>;
};
export class User {
  public isValidEmail(email: string): Either<InvalidParamError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidParamError('email'));
  }

  public isValidName(name: string): Either<InvalidParamError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidParamError('name'));
  }

  public isValidPassword(password: string): Either<InvalidParamError, string> {
    const isValid = isValidPassword(password);
    return isValid ? right(password) : left(new InvalidParamError('password'));
  }

  public isValidBio(bio: string): Either<InvalidParamError, string> {
    const isValid = isValidBio(bio);
    return isValid ? right(bio) : left(new InvalidParamError('bio'));
  }

  public build(data: user): Either<InvalidParamError, userStoreDTO> {
    const Objects: ObjectsBuildType = {
      name: this.isValidName(data.name),
      email: this.isValidEmail(data.email),
      password: this.isValidPassword(data.password),
      bio: this.isValidBio(data.bio),
    };

    if (Objects.name.isLeft()) {
      return left(Objects.name.value);
    }

    if (Objects.email.isLeft()) {
      return left(Objects.email.value);
    }

    if (Objects.password.isLeft()) {
      return left(Objects.password.value);
    }

    if (Objects.bio.isLeft()) {
      return left(Objects.bio.value);
    }
    return right({
      id: randomUUID(),
      name: Objects.name.value,
      email: Objects.email.value,
      password: Objects.password.value,
      bio: Objects.bio.value,
      avatar_url: data.avatar_url,
      banner_url: data.banner_url,
      created_at: new Date(),
    });
  }
}
