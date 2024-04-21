import type { ProfileData } from '@/util/profile';
import ProfileSolve from '@/app/profile/ProfileSolve';


export default function ProfileSolves(props: ProfileData) {
    return (
        <div className="bg-black/30 px-12 py-6 rounded-md">
            <h3 className="text-xl text-center font-semibold mb-2">
                Solves
            </h3>

            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row font-semibold text-white">
                        <div className="table-cell border-b border-secondary p-2">Challenge</div>
                        <div className="table-cell border-b border-secondary p-2">Solve time</div>
                        <div className="table-cell border-b border-secondary p-2 text-right">Points</div>
                    </div>
                </div>

                {props.solves.map((s) => (
                    <ProfileSolve
                        {...s}
                        key={s.id}
                    />
                ))}
            </div>
        </div>
    )
}
