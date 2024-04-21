import type { SolveData } from '@/util/solves';
import Link from 'next/link';
import { DateTime } from 'luxon';


export default function Solve(props: SolveData & { rank: number }) {
    return (
        <div className="table-row">
            <div className="table-cell py-2 pr-2 text-secondary text-right text-sm">
                {props.rank}.
            </div>

            <Link
                className="table-cell p-2 text-theme-bright hover:text-theme transition duration-200"
                href={`/profile/${props.userId}`}
            >
                {props.userName}
            </Link>

            <div className="table-cell p-2 text-primary text-sm">
                {DateTime.fromMillis(props.createdAt).toLocaleString(DateTime.DATETIME_MED)}
            </div>
        </div>
    )
}
