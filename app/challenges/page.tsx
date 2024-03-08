import type {Metadata} from 'next';

// Components
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';
import DisplayToggle from '@/app/challenges/DisplayToggle';

// Utils
import {getChallenges} from '@/util/challenges';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default async function ChallengesPage() {
    const data = await getChallenges();

    return (
        <div className="container relative pt-32 pb-24 flex gap-6">
            <Filters challenges={data.data} />
            <Challenges challenges={data.data} />

            <DisplayToggle />
        </div>
    )
}
