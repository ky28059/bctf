export type LeaderboardEntry = {
    id: string,
    name: string,
    score: number
}

export type LeaderboardData = {
    total: number,
    leaderboard: LeaderboardEntry[]
}

type LeaderboardResponse = {
    kind: 'goodLeaderboard',
    message: string,
    data: LeaderboardData
}

export async function getScoreboard(offset: number = 0): Promise<LeaderboardResponse> {
    const res = await fetch(`https://quals-2024.ctf.dicega.ng/json/leaderboard/all/now-${offset}.json`); // TODO
    return res.json();
}
