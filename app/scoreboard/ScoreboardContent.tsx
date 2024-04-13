'use client'

import {useState} from 'react';

// Components
import ScoreboardGraph from '@/app/scoreboard/ScoreboardGraph';
import ScoreboardFilters from '@/app/scoreboard/ScoreboardFilters';
import Scoreboard from '@/app/scoreboard/Scoreboard';

// Utils
import {getGraph, getScoreboard, GraphEntryData, LeaderboardData} from '@/util/scoreboard';
import {CTFConfig, SCOREBOARD_PAGE_SIZE} from '@/util/config';


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

    async function updateDivision(div: string) {
        const graphRes = await getGraph(div);
        if (graphRes.kind !== 'goodLeaderboard') return;

        const scoreboardRes = await getScoreboard(0, div);
        if (scoreboardRes.kind !== 'goodLeaderboard') return;

        setGraph(graphRes.data.graph);
        setScoreboard(scoreboardRes.data);
        setPage(0);

        setDivision(div);
    }

    async function updatePage(page: number) {
        const res = await getScoreboard(page * SCOREBOARD_PAGE_SIZE, division);
        if (res.kind !== 'goodLeaderboard') return;

        setScoreboard(res.data);
        setPage(page);
    }

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
                />
            </div>
        </>
    )
}
