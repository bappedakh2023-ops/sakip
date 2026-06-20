import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Redirect ke login jika belum ada sesi
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. Ambil profil untuk memeriksa role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const role = profile?.role;
  const path = req.nextUrl.pathname;

  // 3. Proteksi rute berbasis Role
  if (path.startsWith('/admin') && role !== 'super_admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  
  if (path.startsWith('/verifikator') && role !== 'verifikator') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return res;
}

// Menentukan rute yang diproteksi
export const config = {
  matcher: ['/admin/:path*', '/verifikator/:path*', '/opd/:path*'],
};