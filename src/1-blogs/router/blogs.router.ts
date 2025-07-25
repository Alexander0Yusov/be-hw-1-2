import { Router } from 'express';
import { idValidation } from '../../core/middlewares/validation/idValidation';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errorsCatchMiddleware';
import { getBlogByIdHandler } from './handlers/getBlogByIdHandler';

export const blogsRouter = Router({});

blogsRouter
  .get('', () => {})
  .post('', () => {})
  .get('/:id', idValidation, errorsCatchMiddleware, getBlogByIdHandler)
  .put('/:id', () => {})
  .delete('/:id', () => {});
