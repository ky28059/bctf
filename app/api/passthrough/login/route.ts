import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// Utils
import {login} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


// TODO: error handling?
export async function POST(req: Request) {
    const {teamToken} = await req.json();
    const token = await login(teamToken);

    cookies().set(AUTH_COOKIE_NAME, token);

    return NextResponse.json({ok: true});
}
