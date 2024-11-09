import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import Filters from '@/app/challenges/Filters';
import Challenges from '@/app/challenges/Challenges';
import DisplayToggle from '@/app/challenges/DisplayToggle';
import CTFNotStarted from '@/components/CTFNotStarted';

// Utils
import { getChallenges } from '@/util/challenges';
import { getMyProfile } from '@/util/profile';
import { getAdminChallenges } from '@/util/admin';
import { AUTH_COOKIE_NAME } from '@/util/config';


export const metadata: Metadata = {
    title: 'Challenges'
}

export default async function ChallengesPage() {
    const token = cookies().get(AUTH_COOKIE_NAME)!.value;

    const challenges = await getChallenges(token);
    const profile = await getMyProfile(token);

    if (profile.kind === 'badToken')
        return redirect('/logout');

    if (challenges.kind !== 'goodChallenges') return (
        <CTFNotStarted />
    );

    // Support non-standard properties by sourcing them from the admin endpoint.
    const adminData = await getAdminChallData();
    let challs = challenges.data;

    if (adminData) {
        // Filter out challs with prereqs that are not met yet
        const solved = new Set(profile.data.solves.map((c) => c.id));
        challs = challs.filter((c) => !adminData[c.id].prereqs || adminData[c.id].prereqs!.every((p) => solved.has(p)));

        // Inject desired properties back into client challenges
        for (const c of challs) {
            c.difficulty = adminData[c.id].difficulty;
        }
    }

    return (
        <div className="container relative pt-32 pb-14 flex flex-col md:flex-row gap-6">
            <Filters
                challenges={challs}
                solves={profile.data.solves}
            />
            <Challenges
                challenges={challs}
                solves={profile.data.solves}
            />

            <DisplayToggle />
        </div>
    );
}

async function getAdminChallData() {
    if (!process.env.ADMIN_TOKEN) return;

    const res = await getAdminChallenges(process.env.ADMIN_TOKEN);
    if (res.kind === 'badToken') return;

    return Object.fromEntries(res.data.map((c) => [c.id, c]));
}
