import type {Metadata} from 'next';
import Scoreboard from '@/app/scoreboard/Scoreboard';
import {getScoreboard} from '@/util/scoreboard';


export const metadata: Metadata = {
    title: 'Scoreboard'
}

export default async function ScoreboardPage() {
    const data = await getScoreboard();

    return (
        <div className="container pt-32 pb-24">
            <Scoreboard {...data.data} />
        </div>
    )
}
