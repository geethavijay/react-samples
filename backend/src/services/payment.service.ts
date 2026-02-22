import Stripe from 'stripe';
import { env } from '../config/env.js';

const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY)
  : null;

export async function createCheckoutSession(amountCents: number, orderId: string) {
  if (!stripe) {
    return { provider: 'mock', clientSecret: `mock_${orderId}` };
  }

  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    metadata: { orderId },
    automatic_payment_methods: { enabled: true }
  });

  return { provider: 'stripe', clientSecret: intent.client_secret };
}
