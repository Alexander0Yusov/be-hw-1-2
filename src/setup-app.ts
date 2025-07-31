import express, { Express } from 'express';
import cors from 'cors';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/paths';
import { blogsRouter } from './1-blogs/router/blogs.router';
import { postsRouter } from './2-posts/router/posts.router';
import { testRouter } from './3-testing/router/tests.router';
import { setupSwagger } from './core/swagger/setup-swagger';

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(TESTING_PATH, testRouter);

  setupSwagger(app);

  return app;
};
