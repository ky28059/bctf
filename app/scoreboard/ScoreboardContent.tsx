'use client'

import {useState} from 'react';

// Components
import ScoreboardGraph from '@/app/scoreboard/ScoreboardGraph';
import ScoreboardFilters from '@/app/scoreboard/ScoreboardFilters';
import Scoreboard from '@/app/scoreboard/Scoreboard';

// Utils
import {getGraph, GraphEntryData, LeaderboardData} from '@/util/scoreboard';


type ScoreboardContentProps = {
    graph: GraphEntryData[],
    scoreboard: LeaderboardData,
    name?: string
}
export default function ScoreboardContent(props: ScoreboardContentProps) {
    const [division, setDivision] = useState('all');

    const [graph, setGraph] = useState(props.graph);
    const [scoreboard, setScoreboard] = useState(props.scoreboard);

    async function updateDivision(div: string) {
        const graphRes = await getGraph(div);
        if (graphRes.kind !== 'goodLeaderboard') return;

        setGraph(graphRes.data.graph);
        setDivision(div);
    }

    return (
        <>
            <ScoreboardGraph graph={graph} />

            <div className="flex gap-4">
                <ScoreboardFilters
                    division={division}
                    setDivision={updateDivision}
                />
                <Scoreboard
                    {...scoreboard}
                    name={props.name}
                />
            </div>
        </>
    )
}
