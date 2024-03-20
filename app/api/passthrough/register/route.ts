import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// Utils
import {register} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


// TODO: see todo in login route
export async function POST(req: Request) {
    const {name, email} = await req.json();
    const res = await register(email, name);

    if (res.kind === 'badKnownEmail')
        return NextResponse.json({error: res.message}, {status: 400});

    cookies().set(AUTH_COOKIE_NAME, res.data.authToken);

    return NextResponse.json({ok: true});
}
