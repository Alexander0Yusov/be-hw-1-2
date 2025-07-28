import { Request, Response } from 'express';

import { blogsRepository } from '../../repository/blogs.repository';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { HttpStatus } from '../../../core/types/HttpStatus';

export function getBlogHandler(req: Request, res: Response) {
  const blog = blogsRepository.findById(req.params.id);

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
    return;
  }

  res.status(HttpStatus.Ok).send(blog);
}
