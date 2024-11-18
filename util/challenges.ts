import type { CTFEndedResponse } from '@/util/errors';


export type Challenge = {
    name: string,
    id: string,
    files: FileData[]
    category: string,
    author: string,
    description: string,
    sortWeight: number,
    solves: number,
    points: number,
} & Partial<NonStandardChallProps>

type NonStandardChallProps = {
    difficulty: string,
    tags: string[],
}

type FileData = {
    url: string,
    name: string
}

type ChallengesResponse = {
    kind: 'goodChallenges',
    message: string,
    data: Challenge[]
}

export async function getChallenges(token: string): Promise<ChallengesResponse | CTFEndedResponse> {
    const res = await fetch(`${process.env.API_BASE}/challs`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
}
