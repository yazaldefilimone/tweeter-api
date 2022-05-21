import { NotFoundError } from '@/domain/errors';
import { Either } from '@/shared/error-handler/either';
import { postStorage } from '@/domain/post/dtos';
import { InvalidContentError } from '@/domain/post/errors';

export type postUseCaseSuccess = postStorage;
export type postUseCaseSuccessMany = postStorage[];
export type postUseCaseFailed = InvalidContentError | NotFoundError;
export type postUseCaseFailedMany = NotFoundError;

export type postUseCaseResponse = Either<postUseCaseFailed, postUseCaseSuccess>;
export type postUseCaseResponseMany = Either<postUseCaseFailedMany, postUseCaseSuccessMany>;
