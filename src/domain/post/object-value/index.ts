import { invalidParamError } from '@/domain/errors';
import { Either, left, right } from '@/shared/error-handler/either';
import { isValidName, isValidUsername } from '@/shared/validators';

export class PostObjectValue {
  Name(name: string): Either<invalidParamError, string> {
    return isValidName(name) ? right(name) : left(new invalidParamError('name'));
  }
  UserName(username: string): Either<invalidParamError, string> {
    return isValidUsername(username) ? right(username) : left(new invalidParamError('username'));
  }
  PostContent(post: string): Either<invalidParamError, string> {
    return isValidUsername(post) ? right(post) : left(new invalidParamError('post content'));
  }
}
