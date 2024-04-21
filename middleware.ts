import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/util/config';


export function middleware(request: NextRequest) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (token) return;

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ['/challenges', '/profile'],
}
