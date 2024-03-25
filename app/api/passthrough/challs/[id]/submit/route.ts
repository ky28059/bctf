import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// Utils
import {attemptSubmit} from '@/util/flags';
import {AUTH_COOKIE_NAME} from '@/util/config';


export async function POST(req: Request, {params}: {params: {id: string}}) {
    const token = cookies().get(AUTH_COOKIE_NAME)?.value;
    if (!token)
        return NextResponse.json({error: 'Missing token'}, {status: 400});

    const {flag} = await req.json();

    const res = await attemptSubmit(token, params.id, flag);
    return NextResponse.json(res);
}
