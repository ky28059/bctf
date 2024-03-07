export type ProfileData = {
    name: string,
    ctftimeId: null,
    division: string,
    score: number,
    globalPlace: number,
    divisionPlace: number,
    solves: Solve[]
}

export type Solve = {
    category: string,
    name: string,
    points: number,
    solves: number,
    id: string,
    createdAt: number // epoch ms
}

type ProfileResponse = {
    kind: 'goodUserData',
    message: string,
    data: ProfileData
}

export async function getProfile(id: string): Promise<ProfileResponse> {
    const res = await fetch(`https://quals-2024.ctf.dicega.ng/json/users/${id}.json`);
    return res.json();
}
