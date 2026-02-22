import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['GROCERIES', 'NUTS_SPICES'], required: true },
    priceCents: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export const Product = model('Product', productSchema);
