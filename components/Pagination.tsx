import { useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';


type PaginationProps = {
    page: number,
    maxPage: number,
    setPage: (n: number) => void
}
export default function Pagination(props: PaginationProps) {
    const { page, maxPage, setPage } = props;
    const visiblePages = 9;

    function decrementPage() {
        void setPage(page - 1);
    }

    function incrementPage() {
        void setPage(page + 1);
    }

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

    return (
        <div className="flex gap-1.5 justify-center text-secondary mt-2">
            <button
                className="disabled:text-tertiary enabled:hover:text-primary transition duration-200 mr-2"
                onClick={decrementPage}
                disabled={page <= 0}
            >
                <FaChevronLeft />
            </button>

            {startPage > 1 && (
                <>
                    <PaginationItem
                        page={page}
                        setPage={setPage}
                        i={1}
                    />
                    <p className="text-secondary text-center w-9">...</p>
                </>
            )}

            {pages.map((i) => (
                <PaginationItem
                    page={page}
                    setPage={setPage}
                    i={i}
                    key={i}
                />
            ))}

            {endPage < maxPage && (
                <>
                    <p className="text-secondary text-center w-9">...</p>
                    <PaginationItem
                        page={page}
                        setPage={setPage}
                        i={maxPage}
                    />
                </>
            )}

            <button
                className="disabled:text-tertiary enabled:hover:text-primary transition duration-200 ml-2"
                onClick={incrementPage}
                disabled={page >= maxPage - 1}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}


type PaginationItemProps = {
    page: number,
    setPage: (p: number) => void,
    i: number
}
function PaginationItem(props: PaginationItemProps) {
    const { page, setPage, i } = props;

    return (
        <button
            className={'w-9 py-1.5 rounded transition duration-200 ' + (page === i - 1 ? 'bg-theme text-white' : 'hover:text-white')}
            onClick={() => setPage(i - 1)}
        >
            {i}
        </button>
    )
}
