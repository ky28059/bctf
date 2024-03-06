import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';


export default function ChallengesPage() {
    return (
        <div className="container py-24 flex gap-4">
            <Filters />
            <Challenges />
        </div>
    )
}
