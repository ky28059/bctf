export type Challenge = {
    name: string,
    id: string,
    files: FileData[]
    category: string,
    author: string,
    description: string, // TODO?
    sortWeight: number,
    solves: number,
    points: number,
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

export async function getChallenges(): Promise<ChallengesResponse> {
    const res = await fetch('https://quals-2024.ctf.dicega.ng/json/challs.json'); // TODO
    return await res.json();
}
