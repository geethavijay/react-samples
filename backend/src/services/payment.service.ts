import Razorpay from 'razorpay';
import { env } from '../config/env.js';

const razorpay = env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET })
  : null;

export async function createPaymentOrder(amountCents: number, receipt: string) {
  if (!razorpay) {
    return { provider: 'mock', id: `mock_${receipt}`, amount: amountCents };
  }

  const order = await razorpay.orders.create({
    amount: amountCents,
    currency: 'INR',
    receipt,
    payment_capture: true
  });

  return { provider: 'razorpay', ...order };
}
