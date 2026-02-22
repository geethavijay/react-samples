import { PrismaClient, Category } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('Admin@1234', 10);
  await prisma.user.create({
    data: {
      email: 'admin@gromart.com',
      name: 'Platform Admin',
      passwordHash: adminPassword,
      role: 'admin'
    }
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Organic Brown Rice 5kg',
        description: 'Whole grain rice sourced from certified organic farms.',
        category: Category.GROCERIES,
        priceCents: 1299,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c'
      },
      {
        name: 'Cold Pressed Sunflower Oil 1L',
        description: 'Low-absorption refined oil for daily cooking.',
        category: Category.GROCERIES,
        priceCents: 499,
        stock: 150,
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5'
      },
      {
        name: 'Premium Cashew Nuts 500g',
        description: 'Freshly packed whole cashews ideal for snacking.',
        category: Category.NUTS_SPICES,
        priceCents: 899,
        stock: 120,
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32'
      },
      {
        name: 'Whole Black Pepper 200g',
        description: 'Bold aroma peppercorns from single-origin plantations.',
        category: Category.NUTS_SPICES,
        priceCents: 349,
        stock: 200,
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'
      }
    ]
  });

  console.log('Seed complete. Admin: admin@gromart.com / Admin@1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
