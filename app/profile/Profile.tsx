import { cookies } from 'next/headers';

// Components
import ProfileCard from '@/app/profile/ProfileCard';
import ProfileSolves from '@/app/profile/ProfileSolves';
import { getChallenges } from '@/util/challenges';

// Utils
import type { ProfileData } from '@/util/profile';
import { AUTH_COOKIE_NAME, getConfig } from '@/util/config';


export default async function Profile(props: ProfileData) {
    const c = await cookies();
    const token = c.get(AUTH_COOKIE_NAME)?.value;

    const challs = token
        ? await getChallenges(token)
        : null;

    const config = await getConfig();

    return (
        <div className="flex flex-col gap-4 grow">
            <ProfileCard
                {...props}
                challs={challs?.data}
                config={config.data}
            />
            <ProfileSolves {...props} />
        </div>
    )
}
