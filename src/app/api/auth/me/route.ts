import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      return NextResponse.json({ user: null });
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!dbUser) {
      const name =
        authUser.user_metadata?.full_name ||
        authUser.user_metadata?.name ||
        authUser.email?.split('@')[0] ||
        'Staff Member';
      const avatarUrl =
        authUser.user_metadata?.avatar_url ||
        authUser.user_metadata?.picture ||
        null;

      dbUser = await prisma.user.upsert({
        where: { id: authUser.id },
        update: {
          email: authUser.email,
          name,
          avatarUrl,
        },
        create: {
          id: authUser.id,
          email: authUser.email,
          name,
          avatarUrl,
          role: 'STAFF',
        },
      });
    }

    return NextResponse.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        avatarUrl: dbUser.avatarUrl,
        role: dbUser.role,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error in /api/auth/me:', err);
    return NextResponse.json({ user: null, error: message }, { status: 500 });
  }
}
