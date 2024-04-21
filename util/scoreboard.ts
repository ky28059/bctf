'use server'

import type { CTFNotStartedResponse } from '@/util/errors';
import { SCOREBOARD_PAGE_SIZE } from '@/util/config';


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

export async function getScoreboard(offset: number = 0, division?: string): Promise<LeaderboardResponse | CTFNotStartedResponse> {
    const endpoint = `${process.env.API_BASE}/leaderboard/now?limit=${SCOREBOARD_PAGE_SIZE}&offset=${offset}`
        + (division && division !== 'all' ? `&division=${division}` : '');

    const res = await fetch(endpoint, {
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

export async function getGraph(division?: string): Promise<GraphResponse | CTFNotStartedResponse> {
    const endpoint = `${process.env.API_BASE}/leaderboard/graph?limit=10` + (division && division !== 'all' ? `&division=${division}` : '');

    const res = await fetch(endpoint, {
        cache: 'no-store'
    });
    return res.json();
}
