import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// Utils
import {login} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


// TODO: error handling?
export async function POST(req: Request) {
    const {teamToken} = await req.json();
    const res = await login(teamToken);

    if (res.kind === 'badTokenVerification')
        return NextResponse.json({error: res.message}, {status: 401});

    cookies().set(AUTH_COOKIE_NAME, res.data.authToken);

    return NextResponse.json({ok: true});
}
