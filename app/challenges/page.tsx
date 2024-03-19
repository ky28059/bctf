import type {Metadata} from 'next';
import {cookies} from 'next/headers';

// Components
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';
import DisplayToggle from '@/app/challenges/DisplayToggle';

// Utils
import {getChallenges} from '@/util/challenges';
import {AUTH_COOKIE_NAME} from '@/util/config';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default async function ChallengesPage() {
    const token = cookies().get(AUTH_COOKIE_NAME)!.value;
    const data = await getChallenges(token);

    return (
        <div className="container relative pt-32 pb-24 flex gap-6">
            <Filters challenges={data.data} />
            <Challenges challenges={data.data} />

            <DisplayToggle />
        </div>
    )
}
