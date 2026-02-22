import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { createCheckoutSession } from '../services/payment.service.js';

class OrderValidationError extends Error {}

export async function createOrder(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const { items, shippingAddress } = req.body as {
      items: { productId: string; quantity: number }[];
      shippingAddress: string;
    };

    const createdOrder = await prisma.$transaction(async (tx) => {
      const productIds = items.map((i) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });

      const mappedItems = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
          throw new OrderValidationError(`Product unavailable: ${item.productId}`);
        }

        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.priceCents
        };
      });

      const totalCents = mappedItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

      const order = await tx.order.create({
        data: {
          userId,
          shippingAddress,
          totalCents,
          items: {
            create: mappedItems
          }
        },
        include: { items: true }
      });

      for (const item of mappedItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return order;
    });

    const payment = await createCheckoutSession(createdOrder.totalCents, createdOrder.id);
    return res.status(201).json({ order: createdOrder, payment });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return res.status(400).json({ message: error.message });
    }

    throw error;
  }
}

export async function listOrders(req: Request, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const orders = await prisma.order.findMany({
    where: user.role === 'admin' ? undefined : { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return res.json(orders);
}
