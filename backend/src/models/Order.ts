import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
    totalCents: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    items: [orderItemSchema]
  },
  { timestamps: true }
);

export const Order = model('Order', orderSchema);
