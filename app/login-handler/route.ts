import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/util/auth';


export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const token = params.get('token');
    if (!token)
        return NextResponse.redirect(new URL('/login', req.url));

    const res = await login(token);
    if ('error' in res)
        return NextResponse.redirect(new URL(`/login?error=${res.error}`, req.url));

    return NextResponse.redirect(new URL('/profile', req.url));
}
