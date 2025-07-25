import { validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../types/HttpStatus';

const formatErrors = (error: ValidationError) => ({
  field: error.type, // Поле с ошибкой
  message: error.msg, // Сообщение ошибки
});

export const errorsCatchMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).formatWith(formatErrors).array();

  if (errors.length) {
    return res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
  }

  next(); // Если ошибок нет, передаём управление дальше
};
