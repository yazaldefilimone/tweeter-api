import { Either } from '@/shared/error-handler/either';
import { post } from '../../dtos';
import { InvalidContentError } from '../../errors';

type buildContentFailed = InvalidContentError;
export type buildContentResponse = Either<buildContentFailed, post>;
