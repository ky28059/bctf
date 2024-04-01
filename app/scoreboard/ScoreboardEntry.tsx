import type {LeaderboardEntry} from '@/util/scoreboard';
import Link from 'next/link';


export default function ScoreboardEntry(props: LeaderboardEntry & {rank: number, percent: number}) {
    return (
        <div className="table-row group">
            <div className="table-cell w-10 py-1 pl-2 text-secondary text-right pr-6 border-t border-tertiary group-hover:bg-white/10 transition duration-100">
                {props.rank}
            </div>

            <Link
                className="table-cell text-primary hover:text-white text-right transition duration-100 font-semibold py-1 pr-8 w-36 border-t border-tertiary group-hover:bg-white/10"
                href={`/profile/${props.id}`}
            >
                {props.name}
            </Link>

            <div className="table-cell h-6 text-white relative py-1 border-t border-tertiary group-hover:bg-white/10 transition duration-100">
                <div
                    className="absolute inset-0 bg-theme my-1.5"
                     style={{width: `${props.percent}%`}}
                />
                <p className="relative text-sm pl-2 py-1">{props.score} points</p>
            </div>
        </div>
    )
}
