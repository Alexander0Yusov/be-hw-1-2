import { Request, Response } from 'express';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';

export function getPostHandler(req: Request, res: Response) {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));
    return;
  }

  res.status(HttpStatus.Ok).send(post);
}
