'use server'

import type {CtfEndedResponse} from '@/util/errors';
import {cookies} from 'next/headers';
import {AUTH_COOKIE_NAME} from '@/util/config';


type GoodFlagResponse = {
    kind: 'goodFlag',
    message: 'The flag is correct.',
    data: null
}

type BadFlagResponse = {
    kind: 'badFlag',
    message: 'The flag was incorrect.',
    data: null
}

export async function attemptSubmit(
    id: string,
    flag: string
) {
    const token = cookies().get(AUTH_COOKIE_NAME)?.value;
    if (!token) return {error: 'Missing token'};

    const res: GoodFlagResponse | BadFlagResponse | CtfEndedResponse = await (await fetch(`${process.env.API_BASE}/challs/${id}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({flag})
    })).json();

    if (res.kind === 'badEnded')
        return {error: res.message};

    return {ok: res.kind === 'goodFlag'};
}
