import type {Metadata} from 'next';

// Components
import Scoreboard from '@/app/scoreboard/Scoreboard';
import ScoreboardGraph from '@/app/scoreboard/ScoreboardGraph';
import CTFNotStarted from '@/components/CTFNotStarted';

// Utils
import {getGraph, getScoreboard} from '@/util/scoreboard';


export const metadata: Metadata = {
    title: 'Scoreboard'
}

export default async function ScoreboardPage() {
    const scoreboard = await getScoreboard();
    const graph = await getGraph();

    return (scoreboard.kind === 'goodLeaderboard' && graph.kind === 'goodLeaderboard') ? (
        <div className="container pt-32 pb-14 flex flex-col gap-4">
            <ScoreboardGraph graph={graph.data.graph} />
            <Scoreboard {...scoreboard.data} />
        </div>
    ) : (
        <CTFNotStarted />
    )
}
