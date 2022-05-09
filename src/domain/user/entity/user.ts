import { InvalidParamError } from '@/domain/errors/InvalidParamError';
import { Either, right, left } from '@/shared/error-handler/either';
import { isValidEmail, isValidName, isValidPassword, isValidBio } from '@/shared/validators';
import { user, userStoreDTO } from '../dtos';

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
  public isValid(email: string): Either<InvalidParamError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidParamError('email'));
  }

  public build(data: user) {}
}
