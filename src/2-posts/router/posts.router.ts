import { Router } from 'express';
import { idValidationMiddleware } from '../../core/middlewares/validation/id-validation.middleware';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { superAdminGuardMiddleware } from '../../core/middlewares/validation/super-admin-guard.middleware';
import { dtoValidationMiddleware } from '../validation/dto-validation.middleware';
import {
  deletePostHandler,
  getPostHandler,
  getPostListHandler,
  postPostHandler,
  putPostHandler,
} from './handlers';

export const postsRouter = Router({});

postsRouter
  .get('', getPostListHandler)
  .post(
    '',
    superAdminGuardMiddleware,
    dtoValidationMiddleware,
    errorsCatchMiddleware,
    postPostHandler,
  )
  .get('/:id', idValidationMiddleware, errorsCatchMiddleware, getPostHandler)
  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    dtoValidationMiddleware,
    errorsCatchMiddleware,
    putPostHandler,
  )
  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    errorsCatchMiddleware,
    deletePostHandler,
  );
