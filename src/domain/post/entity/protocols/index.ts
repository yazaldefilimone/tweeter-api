import { Either } from '@/shared/error-handler/either';
import { PostDTO } from '@/domain/post/dtos';
import { invalidParamError } from '@/domain/errors';

export type PostResponse = Either<invalidParamError, PostDTO>;
