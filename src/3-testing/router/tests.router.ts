import { Response, Router } from 'express';
import { db } from '../../db/in-memory.db';
import { HttpStatus } from '../../core/types/HttpStatus';

export const testRouter = Router({});

testRouter.delete('/all-data', (req, res: Response) => {
  db.blogs = [];
  db.posts = [];

  res.sendStatus(HttpStatus.NoContent);
});
