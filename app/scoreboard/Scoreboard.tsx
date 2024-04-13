'use client'

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

// Components
import ScoreboardEntry from '@/app/scoreboard/ScoreboardEntry';
import Pagination from '@/components/Pagination';

// Utils
import {LeaderboardData} from '@/util/scoreboard';
import {SCOREBOARD_PAGE_SIZE} from '@/util/config';


type ScoreboardProps = LeaderboardData & {
    name?: string,
    page: number,
    setPage: (p: number) => void
}
export default function Scoreboard(props: ScoreboardProps) {
    const maxScore = props.leaderboard[0]?.score ?? 0;
    const maxPage = Math.ceil(props.total / SCOREBOARD_PAGE_SIZE);

    // Re-fetch and merge scoreboard data periodically
    const {refresh} = useRouter();
    useEffect(() => {
        refresh();
        const id = setInterval(() => refresh(), 1000 * 60);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="w-full bg-black/30 flex flex-col px-4 sm:px-12 py-8 rounded-md backdrop-blur-sm">
            <div className="table">
                <div className="table-header-group">
                    <div className="table-row text-white font-semibold">
                        <div className="table-cell text-right pr-6 pl-2 text-primary">#</div>
                        <div className="table-cell text-right w-56 xl:w-72 pr-8">Team</div>
                        <div className="table-cell">Points</div>
                    </div>
                </div>

                {props.leaderboard.map((d, i) => (
                    <ScoreboardEntry
                        {...d}
                        rank={(props.page * SCOREBOARD_PAGE_SIZE) + i + 1}
                        percent={d.score / maxScore * 100}
                        selected={d.name === props.name}
                        key={d.id}
                    />
                ))}
            </div>

            <Pagination
                page={props.page}
                setPage={props.setPage}
                maxPage={maxPage}
            />
        </section>
    )
}
