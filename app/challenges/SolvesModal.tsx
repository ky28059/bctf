'use client'

import {useEffect, useState} from 'react';

// Components
import CenteredModal from '@/components/CenteredModal';
import Solve from '@/app/challenges/Solve';

// Utils
import type {Challenge} from '@/util/challenges';
import {getSolves, SolveData} from '@/util/solves';

// Icons
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';


type SolvesModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function SolvesModal(props: SolvesModalProps) {
    const [solves, setSolves] = useState<SolveData[]>([]);
    const [page, setPage] = useState(0);

    const maxPage = Math.ceil(props.challenge.solves / 10);

    useEffect(() => {
        if (!props.open) return;
        getSolves(props.challenge.id, 0).then((r) => setSolves(r.data.solves));
    }, [props.open]);

    async function updatePage(page: number) {
        const res = await getSolves(props.challenge.id, page * 10);
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
        <CenteredModal
            className="relative bg-background rounded-lg px-8 py-6 text-white shadow-lg w-full max-w-xl max-h-[90%]"
            isOpen={props.open}
            setIsOpen={props.setOpen}
        >
            <h1 className="flex gap-2 items-center text-2xl font-bold mb-4">
                Solves for {props.challenge.name}

                <span className="text-sm px-2 py-0.5 bg-theme-bright/25 text-theme-bright font-semibold rounded-full">
                    {props.challenge.category}
                </span>
            </h1>

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
                        rank={(page * 10) + i + 1}
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
        </CenteredModal>
    )
}
