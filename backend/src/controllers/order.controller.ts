import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { createCheckoutSession } from '../services/payment.service.js';

export async function createOrder(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { items, shippingAddress } = req.body as {
    items: { productId: string; quantity: number }[];
    shippingAddress: string;
  };

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const mappedItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product || product.stock < item.quantity) throw new Error('Product unavailable');
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: product.priceCents
    };
  });

  const totalCents = mappedItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const order = await prisma.order.create({
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
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } }
    });
  }

  const payment = await createCheckoutSession(order.totalCents, order.id);
  return res.status(201).json({ order, payment });
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
