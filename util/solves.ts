'use server'

import { SOLVES_PAGE_SIZE } from '@/util/config';


export type SolveData = {
    id: string,
    createdAt: number,
    userId: string,
    userName: string
}

type SolvesResponse = {
    kind: 'goodChallengeSolves',
    message: string,
    data: {
        solves: SolveData[]
    }
}

export async function getSolves(id: string, offset: number): Promise<SolvesResponse> {
    const res = await fetch(`${process.env.API_BASE}/challs/${id}/solves?limit=${SOLVES_PAGE_SIZE}&offset=${offset}`);
    return res.json();
}
