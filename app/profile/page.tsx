import type {Metadata} from 'next';
import {cookies} from 'next/headers';

// Components
import Profile from '@/app/profile/Profile';

// Utils
import {getMyProfile} from '@/util/profile';
import {AUTH_COOKIE_NAME} from '@/util/config';


// TODO
export const metadata: Metadata = {
    title: 'Profile'
}

export default async function ProfilePage() {
    const token = cookies().get(AUTH_COOKIE_NAME)!.value;
    const data = await getMyProfile(token);

    return <Profile {...data.data} />
}
