'use client'

import {useEffect, useState} from 'react';

// Components
import Solve from '@/app/challenges/Solve';

// Utils
import {SOLVES_PAGE_SIZE} from '@/util/config';
import {SolveData} from '@/util/solves';
import type {Challenge} from '@/util/challenges';

// Icons
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';


type SolvesContentProps = {
    challenge: Challenge
}
export default function SolvesContent(props: SolvesContentProps) {
    const [solves, setSolves] = useState<SolveData[]>([]);
    const [page, setPage] = useState(0);

    const maxPage = Math.ceil(props.challenge.solves / SOLVES_PAGE_SIZE);

    useEffect(() => {
        fetch(`/api/passthrough/challs/${props.challenge.id}/solves?offset=0`)
            .then((r) => r.json())
            .then((r) => setSolves(r.data.solves));
    }, []);

    async function updatePage(page: number) {
        const res = await (await fetch(`/api/passthrough/challs/${props.challenge.id}/solves?offset=${page * SOLVES_PAGE_SIZE}`)).json();
        setSolves(res.data.solves);
        setPage(page);
    }

    function decrementPage() {
        void updatePage(page - 1);
    }

    function incrementPage() {
        void updatePage(page + 1);
    }

    return (
        <>
            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row font-semibold">
                        <div className="table-cell w-6 p-2 border-b border-secondary text-right">#</div>
                        <div className="table-cell p-2 border-b border-secondary">Team</div>
                        <div className="table-cell w-44 p-2 border-b border-secondary">Solve time</div>
                    </div>
                </div>

                {solves.map((s, i) => (
                    <Solve
                        {...s}
                        rank={(page * SOLVES_PAGE_SIZE) + i + 1}
                        key={s.id}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-1.5 justify-center text-secondary mt-2">
                <button
                    className="disabled:text-tertiary enabled:hover:text-primary transition duration-200 mr-2"
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
                    className="disabled:text-tertiary enabled:hover:text-primary transition duration-200 ml-2"
                    onClick={incrementPage}
                    disabled={page === maxPage - 1}
                >
                    <FaChevronRight />
                </button>
            </div>
        </>
    )
}
