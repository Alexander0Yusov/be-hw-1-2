import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { blogsRepository } from '../../repository/blogs.repository';

export function postBlogHandler(req: Request, res: Response) {
  if (!req.body) {
    res.sendStatus(HttpStatus.Forbidden);
  }

  const blog = blogsRepository.create(req.body);

  res.status(HttpStatus.Created).send(blog);
}
