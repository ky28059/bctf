import type {Metadata} from 'next';
import {cookies} from 'next/headers';

// Components
import Scoreboard from '@/app/scoreboard/Scoreboard';
import ScoreboardGraph from '@/app/scoreboard/ScoreboardGraph';
import CTFNotStarted from '@/components/CTFNotStarted';

// Utils
import {getGraph, getScoreboard} from '@/util/scoreboard';
import {getMyProfile} from '@/util/profile';
import {AUTH_COOKIE_NAME} from '@/util/config';


export const metadata: Metadata = {
    title: 'Scoreboard'
}

export default async function ScoreboardPage() {
    const scoreboard = await getScoreboard();
    const graph = await getGraph();

    const token = cookies().get(AUTH_COOKIE_NAME)!.value;
    const profile = await getMyProfile(token);

    return (scoreboard.kind === 'goodLeaderboard' && graph.kind === 'goodLeaderboard') ? (
        <div className="container pt-32 pb-14 flex flex-col gap-4">
            <ScoreboardGraph graph={graph.data.graph} />
            <Scoreboard
                {...scoreboard.data}
                name={profile.data?.name}
            />
        </div>
    ) : (
        <CTFNotStarted />
    )
}
