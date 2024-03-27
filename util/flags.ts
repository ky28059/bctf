import type {CtfEndedResponse} from '@/util/errors';


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
    token: string,
    id: string,
    flag: string
): Promise<GoodFlagResponse | BadFlagResponse | CtfEndedResponse> {
    const res = await fetch(`${process.env.API_BASE}/challs/${id}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({flag})
    })

    return res.json();
}
