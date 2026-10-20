import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed from local JSON files...');

  // 1. Seed Users
  const usersPath = path.join(process.cwd(), 'users.json');
  if (fs.existsSync(usersPath)) {
    try {
      const rawUsers = fs.readFileSync(usersPath, 'utf-8');
      const users = JSON.parse(rawUsers);
      console.log(`Found ${users.length} users to seed.`);

      for (const u of users) {
        if (!u.id || !u.name) continue;
        await prisma.user.upsert({
          where: { id: String(u.id) },
          update: {
            name: u.name,
          },
          create: {
            id: String(u.id),
            name: u.name,
            role: u.name.toLowerCase() === 'admin' ? 'ADMIN' : 'STAFF',
          },
        });
      }
      console.log('✅ Users seeded successfully.');
    } catch (err) {
      console.error('Error seeding users:', err);
    }
  }

  // 2. Seed Receipts
  const storagePath = path.join(process.cwd(), 'storage.json');
  if (fs.existsSync(storagePath)) {
    try {
      const rawReceipts = fs.readFileSync(storagePath, 'utf-8');
      const receipts = JSON.parse(rawReceipts);
      console.log(`Found ${receipts.length} receipts to seed.`);

      for (const r of receipts) {
        if (!r.id) continue;

        const date = r.date ? new Date(r.date) : new Date();
        const dueDate = r.dueDate ? new Date(r.dueDate) : null;

        // Upsert receipt
        await prisma.receipt.upsert({
          where: { id: String(r.id) },
          update: {
            date: isNaN(date.getTime()) ? new Date() : date,
            dueDate: dueDate && !isNaN(dueDate.getTime()) ? dueDate : null,
            customerName: r.customerName || 'Customer',
            customerPhone: r.customerPhone || '',
            subtotal: Number(r.subtotal) || 0,
            discount: Number(r.discount) || 0,
            taxPercent: Number(r.taxPercent) || 0,
            total: Number(r.total) || 0,
            paymentMethod: r.paymentMethod || 'Cash',
            paymentStatus: r.paymentStatus || 'Pending',
            notes: r.notes || '',
            archived: Boolean(r.archived),
            issuedBy: r.issuedBy || null,
          },
          create: {
            id: String(r.id),
            date: isNaN(date.getTime()) ? new Date() : date,
            dueDate: dueDate && !isNaN(dueDate.getTime()) ? dueDate : null,
            customerName: r.customerName || 'Customer',
            customerPhone: r.customerPhone || '',
            subtotal: Number(r.subtotal) || 0,
            discount: Number(r.discount) || 0,
            taxPercent: Number(r.taxPercent) || 0,
            total: Number(r.total) || 0,
            paymentMethod: r.paymentMethod || 'Cash',
            paymentStatus: r.paymentStatus || 'Pending',
            notes: r.notes || '',
            archived: Boolean(r.archived),
            issuedBy: r.issuedBy || null,
            items: {
              create: Array.isArray(r.items)
                ? r.items.map((item: { type?: string; price?: string | number }) => ({
                    type: item.type || 'Custom Item',
                    price: Number(item.price) || 0,
                  }))
                : [],
            },
          },
        });
      }
      console.log('✅ Receipts seeded successfully.');
    } catch (err) {
      console.error('Error seeding receipts:', err);
    }
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
