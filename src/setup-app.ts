import express, { Express } from 'express';
import { db } from './db/in-memory.db';

import { blogsRouter } from './1-blogs/router/blogs.router';
import { BLOGS_PATH } from './core/paths/paths';
import { HttpStatus } from './core/types/HttpStatus';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use('/posts', () => {});

  app.delete('/testing/all-data', (req, res) => {
    db.blogs = [];
    res.sendStatus(HttpStatus.NoContent);
  });
  return app;
};
