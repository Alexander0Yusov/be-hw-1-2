import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';

export function postPostHandler(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(HttpStatus.Forbidden);
  }

  const post = postsRepository.create(req.body);

  res.status(HttpStatus.Created).send(post);
}
