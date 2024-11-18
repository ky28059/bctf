'use server'

import type { CTFEndedResponse } from '@/util/errors';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/util/config';


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
    const c = await cookies();
    const token = c.get(AUTH_COOKIE_NAME)?.value;

    if (!token) return { kind: 'badToken', message: 'Missing token' }; // TODO: hacky?

    const res: GoodFlagResponse | BadFlagResponse | CTFEndedResponse = await (await fetch(`${process.env.API_BASE}/challs/${id}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ flag })
    })).json();

    return res;
}
