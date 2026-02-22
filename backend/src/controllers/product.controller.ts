import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export async function listProducts(req: Request, res: Response) {
  const { category, search } = req.query;
  const products = await prisma.product.findMany({
    where: {
      category: typeof category === 'string' ? category as 'GROCERIES' | 'NUTS_SPICES' : undefined,
      name: typeof search === 'string' ? { contains: search, mode: 'insensitive' } : undefined
    },
    orderBy: { createdAt: 'desc' }
  });

  return res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const product = await prisma.product.create({ data: req.body });
  return res.status(201).json(product);
}
