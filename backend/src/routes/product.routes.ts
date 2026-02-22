import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, listProducts } from '../controllers/product.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

export const productRouter = Router();

productRouter.get('/', listProducts);

productRouter.post(
  '/',
  requireAuth,
  requireRole('admin'),
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('category').isIn(['GROCERIES', 'NUTS_SPICES']),
  body('priceCents').isInt({ min: 1 }),
  body('stock').isInt({ min: 0 }),
  body('imageUrl').isURL(),
  validateRequest,
  createProduct
);
