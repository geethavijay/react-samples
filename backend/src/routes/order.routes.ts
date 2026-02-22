import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder, listOrders } from '../controllers/order.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

export const orderRouter = Router();

orderRouter.use(requireAuth);

orderRouter.get('/', listOrders);

orderRouter.post(
  '/',
  body('shippingAddress').notEmpty(),
  body('items').isArray({ min: 1 }),
  body('items.*.productId').notEmpty(),
  body('items.*.quantity').isInt({ min: 1 }),
  validateRequest,
  createOrder
);
