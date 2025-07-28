import { Request, Response } from 'express';
import { blogsRepository } from '../../repository/blogs.repository';
import { HttpStatus } from '../../../core/types/HttpStatus';

export function getBlogListHandler(req: Request, res: Response) {
  const blog = blogsRepository.findAll();
  res.status(HttpStatus.Ok).send(blog);
}
