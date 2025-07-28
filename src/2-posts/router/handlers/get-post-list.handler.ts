import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { postsRepository } from '../../repository/posts.repository';

export function getPostListHandler(req: Request, res: Response) {
  const post = postsRepository.findAll();
  res.status(HttpStatus.Ok).send(post);
}
