import type { Request, Response } from 'express';
import { Product } from '../models/Product.js';

export async function listProducts(req: Request, res: Response) {
  const { category, search } = req.query;

  const query: Record<string, unknown> = {};
  if (typeof category === 'string') query.category = category;
  if (typeof search === 'string') query.name = { $regex: search, $options: 'i' };

  const products = await Product.find(query).sort({ createdAt: -1 });
  return res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const product = await Product.create(req.body);
  return res.status(201).json(product);
}
