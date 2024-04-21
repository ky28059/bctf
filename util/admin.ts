import type { Challenge } from '@/util/challenges';
import type { BadTokenResponse } from '@/util/errors';


export type AdminChallenge = Challenge & {
    flag: string,
    points: { min: number, max: number }
}

type AdminChallengesResponse = {
    kind: 'goodChallenges',
    message: string,
    data: AdminChallenge[]
}

export async function getAdminChallenges(token: string): Promise<AdminChallengesResponse | BadTokenResponse> {
    const res = await fetch(`${process.env.API_BASE}/admin/challs`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.json();
}
