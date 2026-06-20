import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Mendapatkan sesi pengguna
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Jika tidak ada sesi dan mencoba mengakses rute selain /login, arahkan ke login
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

// Konfigurasi matcher agar middleware hanya berjalan pada rute yang diproteksi
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
