'use client'

import {useState} from 'react';
import ScoreboardEntry from '@/app/scoreboard/ScoreboardEntry';
import {getScoreboard, LeaderboardData} from '@/util/scoreboard';

// Icons
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';


export default function Scoreboard(props: LeaderboardData) {
    const [leaderboard, setLeaderboard] = useState(props.leaderboard);
    const [page, setPage] = useState(0);

    const maxScore = props.leaderboard[0].score;
    const maxPage = Math.ceil(props.total / 100);

    async function updatePage(page: number) {
        const res = await getScoreboard(page * 100);
        setLeaderboard(res.data.leaderboard);
        setPage(page);
    }

    function decrementPage() {
        void updatePage(page - 1);
    }

    function incrementPage() {
        void updatePage(page + 1);
    }

    return (
        <section className="bg-black/30 flex flex-col px-12 py-8 rounded-md">
            <div className="table">
                <div className="table-header-group">
                    <div className="table-row text-white font-semibold">
                        <div className="table-cell text-right pr-6 text-primary">#</div>
                        <div className="table-cell text-right w-80 pr-8">Team</div>
                        <div className="table-cell">Points</div>
                    </div>
                </div>

                {leaderboard.map((d, i) => (
                    <ScoreboardEntry
                        {...d}
                        rank={(page * 100) + i + 1}
                        percent={d.score / maxScore * 100}
                        key={d.id}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-1.5 justify-center text-primary mt-4">
                <button
                    className="disabled:text-secondary enabled:hover:text-white transition duration-200 mr-2"
                    onClick={decrementPage}
                    disabled={page === 0}
                >
                    <FaChevronLeft />
                </button>

                {Array(maxPage).fill(0).map((_, i) => (
                    // TODO: trim this if MAX_PAGE is too long
                    <button
                        className={'py-1.5 px-3 rounded transition duration-200 ' + (page === i ? 'bg-theme text-white' : 'hover:text-white')}
                        onClick={() => updatePage(i)}
                        key={i}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="disabled:text-secondary enabled:hover:text-white transition duration-200 ml-2"
                    onClick={incrementPage}
                    disabled={page === maxPage - 1}
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    )
}
