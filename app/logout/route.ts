import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/util/config';


export async function GET(req: Request) {
    const c = await cookies();
    c.delete(AUTH_COOKIE_NAME);

    return NextResponse.redirect(new URL('/', req.url));
}
