import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validate.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty(),
  validateRequest,
  register
);

authRouter.post('/login', body('email').isEmail(), body('password').notEmpty(), validateRequest, login);
