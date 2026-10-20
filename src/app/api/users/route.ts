import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'users.json');

interface UserInput {
  id?: string | number;
  name?: string;
  email?: string;
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const users = await prisma.user.findMany({
          orderBy: { name: 'asc' },
        });

        if (users.length > 0) {
          return NextResponse.json(
            users.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              avatarUrl: u.avatarUrl,
              role: u.role,
            }))
          );
        }
      } catch (dbErr: unknown) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Database query error';
        console.warn('Prisma users query failed, checking local users.json:', msg);
      }
    }

    // Local fallback
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(fileContent));
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'ENOENT') {
        const defaultAdmin = [{ id: '1', name: 'admin' }];
        return NextResponse.json(defaultAdmin);
      }
      throw err;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    console.error('API GET users error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const usersToSave: UserInput[] = Array.isArray(body) ? body : [body];

    if (process.env.DATABASE_URL) {
      try {
        for (const u of usersToSave) {
          if (!u.id || !u.name) continue;
          await prisma.user.upsert({
            where: { id: String(u.id) },
            update: {
              name: u.name,
              email: u.email || undefined,
            },
            create: {
              id: String(u.id),
              name: u.name,
              email: u.email || undefined,
              role: u.name.toLowerCase() === 'admin' ? 'ADMIN' : 'STAFF',
            },
          });
        }

        // Also write to local backup
        try {
          await fs.writeFile(filePath, JSON.stringify(usersToSave, null, 2), 'utf-8');
        } catch {
          // ignore
        }

        return NextResponse.json({ success: true });
      } catch (dbErr: unknown) {
        const msg = dbErr instanceof Error ? dbErr.message : 'Prisma save error';
        console.warn('Prisma save users failed, falling back to local file:', msg);
      }
    }

    // Local fallback
    await fs.writeFile(filePath, JSON.stringify(usersToSave, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save users';
    console.error('API POST users error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
