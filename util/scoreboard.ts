import {SCOREBOARD_PAGE_SIZE} from '@/util/config';


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
    const res = await fetch(`${process.env.API_BASE}/leaderboard/now?limit=${SCOREBOARD_PAGE_SIZE}&offset=${offset}`);
    return res.json();
}
