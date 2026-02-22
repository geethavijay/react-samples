import bcrypt from 'bcryptjs';
import { connectMongo } from '../lib/mongo.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

async function seed() {
  await connectMongo();

  await Promise.all([User.deleteMany({}), Product.deleteMany({})]);

  const adminPassword = await bcrypt.hash('Admin@1234', 10);
  await User.create({ email: 'admin@gromart.com', passwordHash: adminPassword, name: 'Platform Admin', role: 'admin' });

  await Product.insertMany([
    {
      name: 'Organic Brown Rice 5kg',
      description: 'Whole grain rice sourced from certified organic farms.',
      category: 'GROCERIES',
      priceCents: 129900,
      stock: 75,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c'
    },
    {
      name: 'Premium Cashew Nuts 500g',
      description: 'Freshly packed whole cashews ideal for snacking.',
      category: 'NUTS_SPICES',
      priceCents: 89900,
      stock: 120,
      imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32'
    }
  ]);

  console.log('Seed complete. Admin: admin@gromart.com / Admin@1234');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
