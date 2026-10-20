import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const user = data.user;
      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split('@')[0] ||
        'Staff Member';
      const avatarUrl =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;

      // Sync user to Prisma database
      try {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email: user.email,
            name: name,
            avatarUrl: avatarUrl,
          },
          create: {
            id: user.id,
            email: user.email,
            name: name,
            avatarUrl: avatarUrl,
            role: 'STAFF',
          },
        });
      } catch (dbErr) {
        console.error('Failed to sync user to Prisma:', dbErr);
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Return the user to an error page or home with instructions
  return NextResponse.redirect(`${origin}/?auth_error=oauth_failed`);
}
