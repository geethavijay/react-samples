import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { createPaymentOrder } from '../services/payment.service.js';

export async function createOrder(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { items, shippingAddress } = req.body as {
    items: { productId: string; quantity: number }[];
    shippingAddress: string;
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).session(session);

    const mappedItems = items.map((item) => {
      const product = products.find((p) => String(p._id) === item.productId);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Product unavailable: ${item.productId}`);
      }

      return {
        productId: product._id,
        quantity: item.quantity,
        unitPrice: product.priceCents
      };
    });

    const totalCents = mappedItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

    const order = await Order.create(
      [{ userId, shippingAddress, totalCents, items: mappedItems }],
      { session }
    );

    for (const item of mappedItems) {
      await Product.updateOne({ _id: item.productId }, { $inc: { stock: -item.quantity } }).session(session);
    }

    await session.commitTransaction();

    const payment = await createPaymentOrder(totalCents, String(order[0]._id));
    await Order.updateOne({ _id: order[0]._id }, { razorpayOrderId: payment.id }).exec();

    return res.status(201).json({ order: order[0], payment });
  } catch (error) {
    await session.abortTransaction();
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Order failed' });
  } finally {
    session.endSession();
  }
}

export async function listOrders(req: Request, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const query = user.role === 'admin' ? {} : { userId: user.id };
  const orders = await Order.find(query).populate('items.productId').sort({ createdAt: -1 });
  return res.json(orders);
}
