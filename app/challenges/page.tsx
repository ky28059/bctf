import type {Metadata} from 'next';
import {cookies} from 'next/headers';

// Components
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';
import DisplayToggle from '@/app/challenges/DisplayToggle';

// Utils
import {getChallenges} from '@/util/challenges';
import {getMyProfile} from '@/util/profile';
import {logout} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default async function ChallengesPage() {
    const token = cookies().get(AUTH_COOKIE_NAME)!.value;

    const challenges = await getChallenges(token);
    const profile = await getMyProfile(token);

    if (profile.kind === 'badToken')
        return logout();

    return (
        <div className="container relative pt-32 pb-14 flex flex-col md:flex-row gap-6">
            <Filters
                challenges={challenges.data}
                solves={profile.data.solves}
            />
            <Challenges
                challenges={challenges.data}
                solves={profile.data.solves}
            />

            <DisplayToggle />
        </div>
    )
}
