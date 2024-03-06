import type {Metadata} from 'next';
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default function ChallengesPage() {
    return (
        <div className="container pt-32 pb-24 flex gap-6">
            <Filters />
            <Challenges />
        </div>
    )
}