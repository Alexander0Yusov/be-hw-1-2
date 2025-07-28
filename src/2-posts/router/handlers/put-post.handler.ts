import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { postsRepository } from '../../repository/posts.repository';

export function putPostHandler(req: Request, res: Response) {
  const post = postsRepository.update(req.params.id, req.body);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
