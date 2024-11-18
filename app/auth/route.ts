import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/util/config';


const ALLOWED_REDIRECTS = [`${process.env.KLODD_URL}/auth`];

/**
 * "pseudo-oauth" functionality for Klodd.
 * See {@link https://klodd.tjcsec.club/install-guide/prerequisites/}.
 */
export async function GET(req: NextRequest) {
    const c = await cookies();
    const token = c.get(AUTH_COOKIE_NAME)?.value;

    const params = req.nextUrl.searchParams;
    const state = params.get('state');
    const uri = params.get('redirect_uri');

    if (!token || !state || !uri || !ALLOWED_REDIRECTS.includes(uri))
        return NextResponse.redirect(new URL('/login', req.url));

    return NextResponse.redirect(`${uri}?state=${encodeURIComponent(state)}&token=${encodeURIComponent(token)}`);
}
