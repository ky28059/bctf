import type {Metadata} from 'next';
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';
import {getChallenges} from '@/util/challenges';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default async function ChallengesPage() {
    const data = await getChallenges();

    return (
        <div className="container pt-32 pb-24 flex gap-6">
            <Filters />
            <Challenges challenges={data.data} />
        </div>
    )
}
