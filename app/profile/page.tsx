import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Components
import Profile from '@/app/profile/Profile';
import MyProfileInfo from '@/app/profile/MyProfileInfo';

// Utils
import { getMyProfile } from '@/util/profile';
import { AUTH_COOKIE_NAME } from '@/util/config';


export const metadata: Metadata = {
    title: 'Profile'
}

export default async function ProfilePage() {
    const c = await cookies();

    const token = c.get(AUTH_COOKIE_NAME)!.value;
    const data = await getMyProfile(token);

    if (data.kind === 'badToken')
        return redirect('/logout');

    return (
        <div className="px-8 xl:container pt-32 pb-14 flex flex-col-reverse md:flex-row gap-6">
            <MyProfileInfo {...data.data} />
            <Profile {...data.data} />
        </div>
    )
}
