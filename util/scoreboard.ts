'use server'

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
    const res = await fetch(`${process.env.API_BASE}/leaderboard/now?limit=${SCOREBOARD_PAGE_SIZE}&offset=${offset}`, {
        cache: 'no-store'
    });
    return res.json();
}

type PointsData = {
    time: number,
    score: number
}

export type GraphEntryData = {
    id: string,
    name: string,
    points: PointsData[]
}

type GraphResponse = {
    kind: 'goodLeaderboard',
    message: 'The leaderboard was retrieved.',
    data: {
        graph: GraphEntryData[]
    }
}

export async function getGraph(): Promise<GraphResponse> {
    const res = await fetch(`${process.env.API_BASE}/leaderboard/graph?limit=10`, {
        cache: 'no-store'
    });
    return res.json();
}
