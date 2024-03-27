'use client'

import {useEffect, useMemo, useState} from 'react';

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
    const visiblePages = 9;

    // Calculate pagination parameters
    // Code borrowed and modified from https://github.com/redpwn/rctf/blob/master/client/src/components/pagination.js
    const { pages, startPage, endPage } = useMemo(() => {
        // Follow the google pagination principle of always showing 10 items
        let startPage, endPage;
        if (maxPage <= visiblePages) {
            // Display all
            startPage = 1;
            endPage = maxPage;
        } else {
            // We need to hide some pages
            startPage = page - Math.ceil((visiblePages - 1) / 2)
            endPage = page + Math.floor((visiblePages - 1) / 2)
            if (startPage < 1) {
                startPage = 1;
                endPage = visiblePages;
            } else if (endPage > maxPage) {
                endPage = maxPage
                startPage = maxPage - visiblePages + 1
            }
            if (startPage > 1) {
                startPage += 2
            }
            if (endPage < maxPage) {
                endPage -= 2
            }
        }

        const pages = [] // ...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }
        return { pages, startPage, endPage }
    }, [maxPage, page, visiblePages]);

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

            {/* Pagination */}
            <div className="flex gap-1.5 justify-center text-secondary mt-2">
                <button
                    className="disabled:text-tertiary enabled:hover:text-primary transition duration-200 mr-2"
                    onClick={decrementPage}
                    disabled={page === 0}
                >
                    <FaChevronLeft />
                </button>

                {startPage > 1 && (
                    <>
                        <PaginationItem
                            page={page}
                            setPage={updatePage}
                            i={1}
                        />
                        <p className="text-secondary text-center w-9">...</p>
                    </>
                )}

                {pages.map((i) => (
                    <PaginationItem
                        page={page}
                        setPage={updatePage}
                        i={i}
                        key={i}
                    />
                ))}

                {endPage < maxPage && (
                    <>
                        <p className="text-secondary text-center w-9">...</p>
                        <PaginationItem
                            page={page}
                            setPage={updatePage}
                            i={maxPage}
                        />
                    </>
                )}

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

type PaginationItemProps = {
    page: number,
    setPage: (p: number) => void,
    i: number
}
function PaginationItem(props: PaginationItemProps) {
    const {page, setPage, i} = props;

    return (
        <button
            className={'w-9 py-1.5 rounded transition duration-200 ' + (page === i - 1 ? 'bg-theme text-white' : 'hover:text-white')}
            onClick={() => setPage(i - 1)}
        >
            {i}
        </button>
    )
}
