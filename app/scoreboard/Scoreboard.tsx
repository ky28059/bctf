import type {LeaderboardData} from '@/util/scoreboard';
import ScoreboardEntry from '@/app/scoreboard/ScoreboardEntry';


export default function Scoreboard(props: LeaderboardData) {
    const maxScore = props.leaderboard[0].score;

    return (
        <section className="bg-black/30 flex flex-col px-12 py-8 rounded-md">
            <div className="table">
                <div className="table-header-group">
                    <div className="table-row text-white font-semibold">
                        <div className="table-cell text-right pr-6 text-primary">#</div>
                        <div className="table-cell text-right pr-8">Team</div>
                        <div className="table-cell">Points</div>
                    </div>
                </div>

                {props.leaderboard.map((d, i) => (
                    <ScoreboardEntry
                        {...d}
                        rank={i + 1}
                        percent={d.score / maxScore * 100}
                        key={d.id}
                    />
                ))}
            </div>
        </section>
    )
}
