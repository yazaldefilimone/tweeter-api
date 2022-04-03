import { Either } from '@/shared/error-handler/either';
import { CreatePostDTO } from '@/domain/post/dtos';
import { invalidParamError } from '@/domain/errors';

export type PostResponse = Either<invalidParamError, CreatePostDTO>;
