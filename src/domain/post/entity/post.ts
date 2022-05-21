import { Either, left, right } from '@/shared/error-handler/either';
import { generationUUID } from '@/shared/utils/generationUUID';
import { isValidPostContent } from '@/shared/validators';
import { randomUUID } from 'crypto';
import { post } from '../dtos';
import { InvalidContentError } from '../errors';
import { buildContentResponse } from './contracts';

export class Post {
  private isValidContent(content: string): Either<InvalidContentError, string> {
    const result = isValidPostContent(content);
    return result ? right(content) : left(new InvalidContentError());
  }
  public build(data: post): buildContentResponse {
    if (data.content) {
      const contentOrError = this.isValidContent(data.content);
      if (contentOrError.isLeft()) return left(contentOrError.value);
      return right({
        banner_url: data.banner_url,
        content: contentOrError.value,
        author_id: data.author_id,
      });
    }

    return right({
      id: generationUUID({ isDomain: true }),
      banner_url: data.banner_url,
      content: data.content,
      author_id: data.author_id,
      created_at: new Date(),
    });
  }
}
