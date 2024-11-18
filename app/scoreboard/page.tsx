import type { Metadata } from 'next';
import { cookies } from 'next/headers';

// Components
import ScoreboardContent from '@/app/scoreboard/ScoreboardContent';
import CTFNotStarted from '@/components/CTFNotStarted';

// Utils
import { getGraph, getScoreboard } from '@/util/scoreboard';
import { getMyProfile } from '@/util/profile';
import { AUTH_COOKIE_NAME, getConfig } from '@/util/config';


export const metadata: Metadata = {
    title: 'Scoreboard'
}

export default async function ScoreboardPage() {
    const c = await cookies();

    const scoreboard = await getScoreboard();
    const graph = await getGraph();

    const token = c.get(AUTH_COOKIE_NAME)?.value;
    const profile = token
        ? await getMyProfile(token)
        : undefined;

    const config = await getConfig();

    return (scoreboard.kind === 'goodLeaderboard' && graph.kind === 'goodLeaderboard') ? (
        <div className="container pt-32 pb-14 flex flex-col gap-4">
            <ScoreboardContent
                graph={graph.data.graph}
                scoreboard={scoreboard.data}
                config={config.data}
                name={profile?.data?.name}
            />
        </div>
    ) : (
        <CTFNotStarted />
    )
}
