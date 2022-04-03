import { invalidParamError } from '@/domain/errors';
import { Either, left, right } from '@/shared/error-handler/either';
import { isValidName, isValidPostContent, isValidUsername, isValidPhoto } from '@/shared/validators';

type Ref = {
  username: string;
};
export class PostObjectValue {
  Name(name: string): Either<invalidParamError, string> {
    return isValidName(name) ? right(name) : left(new invalidParamError('name'));
  }
  UserName(username: string): Either<invalidParamError, string> {
    return isValidUsername(username) ? right(username) : left(new invalidParamError('username'));
  }
  PostContent(post?: string): Either<invalidParamError, string> {
    return isValidPostContent(post) ? right(post as string) : left(new invalidParamError('post content'));
  }

  // Refs(refs?: Ref[]): Either<invalidParamError, Ref[]> {
  //   const result = refs?.map((ref) => {
  //     if (!isValidUsername(ref.username)) {
  //       return false
  //     }
  //     return true
  //   });

  //   return right(result);
  // }
  Photo(photo?: string): Either<invalidParamError, string> {
    return isValidPhoto(photo) ? right(photo as string) : left(new invalidParamError('photo content'));
  }
}
