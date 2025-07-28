import { body } from 'express-validator';

export const dtoValidationMiddleware = [
  body('name')
    .trim()
    .isString()
    .withMessage('Ожидается строка')
    .notEmpty()
    .withMessage('Имя обязательно')
    .isLength({ max: 15 })
    .withMessage('Максимум 15 символов'),
  body('description')
    .trim()
    .isString()
    .withMessage('Ожидается строка')
    .notEmpty()
    .withMessage('Описание обязательно')
    .isLength({ max: 500 })
    .withMessage('Максимум 500 символов'),
  body('websiteUrl')
    .trim()
    .isString()
    .withMessage('Ожидается строка')
    .notEmpty()
    .withMessage('Адрес обязательный')
    .isLength({ max: 100 })
    .withMessage('Максимум 100 символов')
    .matches(
      '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$',
    )
    .withMessage('Невалидный формат'),
];
