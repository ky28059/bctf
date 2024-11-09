import type { Solve } from '@/util/profile';
import { DateTime } from 'luxon';


export default function ProfileSolve(props: Solve) {
    return (
        <div className="table-row">
            <div className="table-cell px-2 [overflow-wrap:anywhere]">
                {props.name}
                <span className="font-semibold bg-theme-bright/25 text-theme-bright px-2 py-1 text-xs rounded-full ml-2">
                    {props.category}
                </span>
            </div>

            <div className="table-cell p-2 text-primary">
                {DateTime.fromMillis(props.createdAt).toLocaleString(DateTime.DATETIME_MED)}
            </div>

            <div className="table-cell p-2 text-primary text-right">
                {props.points}
            </div>
        </div>
    )
}
