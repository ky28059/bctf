import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// Utils
import {updateProfile} from '@/util/profile';
import {AUTH_COOKIE_NAME} from '@/util/config';


export async function POST(req: Request) {
    const payload = await req.json();

    const token = cookies().get(AUTH_COOKIE_NAME)?.value;
    if (!token)
        return NextResponse.json({error: 'Not authenticated.'}, {status: 401})

    const res = await updateProfile(token, payload);
    if (res.kind === 'badRateLimit')
        return NextResponse.json({error: `You are doing this too fast! Try again in ${res.data.timeLeft} ms.`}, {status: 400})

    return NextResponse.json({ok: true})
}
