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
    const res = await fetch(`https://quals-2024.ctf.dicega.ng/json/solves/${id}/${offset}.json`);
    return res.json();
}
