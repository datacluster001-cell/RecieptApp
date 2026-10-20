import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';
import type { Receipt as PrismaReceipt, ReceiptItem as PrismaReceiptItem } from '@prisma/client';

const localFilePath = path.join(process.cwd(), 'storage.json');

interface ReceiptWithItems extends PrismaReceipt {
  items: PrismaReceiptItem[];
}

interface ReceiptInputItem {
  id?: string | number;
  type?: string;
  price?: string | number;
}

interface ReceiptInput {
  id: string;
  date?: string | Date;
  dueDate?: string | Date | null;
  customerName?: string;
  customerPhone?: string;
  subtotal?: number;
  discount?: number;
  taxPercent?: number;
  total?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  notes?: string;
  archived?: boolean;
  issuedBy?: string | null;
  items?: ReceiptInputItem[];
}

// Helper to format Prisma receipt for frontend
function formatReceipt(r: ReceiptWithItems) {
  return {
    id: r.id,
    date: r.date instanceof Date ? r.date.toISOString() : r.date,
    dueDate: r.dueDate
      ? r.dueDate instanceof Date
        ? r.dueDate.toISOString().split('T')[0]
        : r.dueDate
      : '',
    customerName: r.customerName,
    customerPhone: r.customerPhone,
    subtotal: Number(r.subtotal) || 0,
    discount: Number(r.discount) || 0,
    taxPercent: Number(r.taxPercent) || 0,
    total: Number(r.total) || 0,
    paymentMethod: r.paymentMethod || 'Cash',
    paymentStatus: r.paymentStatus || 'Pending',
    notes: r.notes || '',
    archived: Boolean(r.archived),
    issuedBy: r.issuedBy || '',
    items: Array.isArray(r.items)
      ? r.items.map((item, idx: number) => ({
          id: item.id || idx + 1,
          type: item.type,
          price: String(item.price),
        }))
      : [],
  };
}

export async function GET() {
  try {
    // 1. Try reading from Prisma
    if (process.env.DATABASE_URL) {
      try {
        const receipts = await prisma.receipt.findMany({
          include: {
            items: true,
          },
          orderBy: {
            date: 'desc',
          },
        });
        return NextResponse.json(receipts.map(formatReceipt));
      } catch (dbErr: unknown) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Prisma query failed';
        console.warn('Database query failed, checking local storage fallback:', msg);
      }
    }

    // 2. Local fallback if DB not configured yet or during initial setup
    try {
      const fileContent = await fs.readFile(localFilePath, 'utf-8');
      return NextResponse.json(JSON.parse(fileContent));
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'ENOENT') {
        return NextResponse.json([]);
      }
      throw err;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch receipts';
    console.error('API GET /api/bills error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const receiptsToSave: ReceiptInput[] = Array.isArray(body) ? body : [body];

    if (receiptsToSave.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    // 1. Save to Prisma if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      try {
        for (const r of receiptsToSave) {
          if (!r.id) continue;

          const date = r.date ? new Date(r.date) : new Date();
          const dueDate = r.dueDate ? new Date(r.dueDate) : null;

          await prisma.$transaction(async (tx) => {
            // Upsert receipt record
            await tx.receipt.upsert({
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
              },
            });

            // If items array is provided, refresh receipt items
            if (Array.isArray(r.items)) {
              await tx.receiptItem.deleteMany({
                where: { receiptId: String(r.id) },
              });

              if (r.items.length > 0) {
                await tx.receiptItem.createMany({
                  data: r.items.map((item) => ({
                    receiptId: String(r.id),
                    type: item.type || 'Custom Item',
                    price: Number(item.price) || 0,
                  })),
                });
              }
            }
          });
        }

        // Also update local storage.json as a backup in development
        try {
          if (Array.isArray(body)) {
            await fs.writeFile(localFilePath, JSON.stringify(body, null, 2), 'utf-8');
          }
        } catch {
          // ignore backup errors
        }

        return NextResponse.json({ success: true, count: receiptsToSave.length });
      } catch (dbErr: unknown) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Prisma save error';
        console.warn('Prisma save failed, writing to local storage fallback:', msg);
      }
    }

    // 2. Local fallback if DB is not connected
    await fs.writeFile(localFilePath, JSON.stringify(receiptsToSave, null, 2), 'utf-8');
    return NextResponse.json({ success: true, count: receiptsToSave.length, fallback: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save receipts';
    console.error('API POST /api/bills error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
