'use client'

import { useEffect, useState } from 'react';

// Components
import Solve from '@/app/challenges/Solve';
import Pagination from '@/components/Pagination';

// Utils
import { SOLVES_PAGE_SIZE } from '@/util/config';
import { getSolves, SolveData } from '@/util/solves';
import type { Challenge } from '@/util/challenges';

// Icons
import { FaRegClock } from 'react-icons/fa6';


type SolvesContentProps = {
    challenge: Challenge
}
export default function SolvesContent(props: SolvesContentProps) {
    const [solves, setSolves] = useState<SolveData[]>([]);
    const [page, setPage] = useState(0);

    const maxPage = Math.ceil(props.challenge.solves / SOLVES_PAGE_SIZE);

    useEffect(() => {
        getSolves(props.challenge.id, 0).then((r) => setSolves(r.data.solves));
    }, []);

    async function updatePage(page: number) {
        const res = await getSolves(props.challenge.id, page * SOLVES_PAGE_SIZE);
        setSolves(res.data.solves);
        setPage(page);
    }

    // "No solves" UI
    if (props.challenge.solves === 0) {
        return (
            <div className="flex flex-col items-center text-primary gap-3 py-3.5">
                <FaRegClock className="text-5xl" />
                <p>{props.challenge.name} has no solves.</p>
            </div>
        )
    }

    return (
        <>
            <div className="table table-fixed w-full">
                <div className="table-header-group">
                    <div className="table-row font-semibold">
                        <div className="table-cell w-9 py-2 pr-2 border-b border-secondary text-right">#</div>
                        <div className="table-cell p-2 border-b border-secondary">Team</div>
                        <div className="table-cell w-44 p-2 border-b border-secondary">Solve time</div>
                    </div>
                </div>

                {solves.length === 0 ? Array(Math.min(SOLVES_PAGE_SIZE, props.challenge.solves)).fill(0).map((_, i) => (
                    // Bare bones "loading UI" to prevent modal resizing after fetch resolution
                    <div className="table-row" key={i}>
                        <div className="table-cell p-2 text-secondary text-right text-sm">
                            {i + 1}.
                        </div>

                        <div className="table-cell p-2 text-transparent">Loading</div>
                        <div className="table-cell p-2 text-primary text-sm" />
                    </div>
                )) : solves.map((s, i) => (
                    <Solve
                        {...s}
                        rank={(page * SOLVES_PAGE_SIZE) + i + 1}
                        key={s.id}
                    />
                ))}
            </div>

            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={updatePage}
            />
        </>
    )
}
