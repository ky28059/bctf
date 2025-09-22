'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import ScoreboardGraph from '@/app/scoreboard/ScoreboardGraph';
import ScoreboardFilters from '@/app/scoreboard/ScoreboardFilters';
import Scoreboard from '@/app/scoreboard/Scoreboard';

// Utils
import { getGraph, getScoreboard, GraphEntryData, LeaderboardData } from '@/util/scoreboard';
import { CTFConfig, SCOREBOARD_PAGE_SIZE } from '@/util/config';


type ScoreboardContentProps = {
    graph: GraphEntryData[],
    scoreboard: LeaderboardData,
    config: CTFConfig,
    name?: string
}
export default function ScoreboardContent(props: ScoreboardContentProps) {
    const [division, setDivision] = useState('all');

    const [graph, setGraph] = useState(props.graph);
    const [scoreboard, setScoreboard] = useState(props.scoreboard);
    const [page, setPage] = useState(0);

    // The max score in the current division
    const [maxScore, setMaxScore] = useState(props.scoreboard.leaderboard[0]?.score ?? 0);

    async function updateDivision(div: string) {
        const graphRes = await getGraph(div);
        if (graphRes.kind !== 'goodLeaderboard') return;

        const scoreboardRes = await getScoreboard(0, div);
        if (scoreboardRes.kind !== 'goodLeaderboard') return;

        setGraph(graphRes.data.graph);
        setScoreboard(scoreboardRes.data);

        setMaxScore(scoreboardRes.data.leaderboard[0]?.score ?? 0);
        setPage(0);

        setDivision(div);
    }

    async function updatePage(page: number) {
        const res = await getScoreboard(page * SCOREBOARD_PAGE_SIZE, division);
        if (res.kind !== 'goodLeaderboard') return;

        setScoreboard(res.data);
        setPage(page);
    }

    // Re-fetch and merge scoreboard data periodically
    // const router = useRouter();
    // useEffect(() => {
    //     router.refresh(); // TODO: don't call this always to avoid excess rerenders?
    //     const id = setInterval(() => router.refresh(), 1000 * 60);
    //     return () => clearInterval(id);
    // }, []);

    return (
        <>
            <ScoreboardGraph graph={graph} />

            <div className="flex flex-col lg:flex-row gap-4">
                <ScoreboardFilters
                    division={division}
                    setDivision={updateDivision}
                    config={props.config}
                />
                <Scoreboard
                    {...scoreboard}
                    name={props.name}
                    page={page}
                    setPage={updatePage}
                    maxScore={maxScore}
                />
            </div>
        </>
    )
}

function scoreboardEqual(a: LeaderboardData, b: LeaderboardData) {
    if (a.total !== b.total) return false;

    return a.leaderboard.every((d, i) => d.id === b.leaderboard[i].id
        && d.name === b.leaderboard[i].name
        && d.score === b.leaderboard[i].score);
}

function graphsEqual(a: GraphEntryData[], b: GraphEntryData[]) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i].name !== b[i].name) return false;
        if (a[i].id !== b[i].id) return false;

        const pointsEqual = a[i].points.every((p, j) => p.score === b[i].points[j].score && p.time === b[i].points[j].time);
        if (!pointsEqual) return false;
    }

    return true;
}
