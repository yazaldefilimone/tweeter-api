import { invalidParamError } from '@/domain/errors';
import { Either, left, right } from '@/shared/error-handler/either';
import { isValidBio, isValidName, isValidEmail, isValidPassword, isValidBorn, isValidUsername } from '@/shared/validators';

export class UserObjectValue {
  Name(name: string): Either<invalidParamError, string> {
    return isValidName(name) ? right(name) : left(new invalidParamError('name'));
  }
  Email(email: string): Either<invalidParamError, string> {
    return isValidEmail(email) ? right(email) : left(new invalidParamError('email'));
  }
  Password(password: string): Either<invalidParamError, string> {
    return isValidPassword(password) ? right(password) : left(new invalidParamError('password'));
  }
  Bio(bio: string): Either<invalidParamError, string> {
    return isValidBio(bio) ? right(bio) : left(new invalidParamError('biography'));
  }
  Born(born: string): Either<invalidParamError, string> {
    return isValidBorn(born) ? right(born) : left(new invalidParamError('born data'));
  }
  UserName(username: string): Either<invalidParamError, string> {
    return isValidUsername(username) ? right(username) : left(new invalidParamError('username'));
  }
}
