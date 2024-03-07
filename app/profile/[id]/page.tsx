import type {Metadata} from 'next';
import Profile from '@/app/profile/Profile';
import {getProfile} from '@/util/profile';


// TODO
export const metadata: Metadata = {
    title: 'Profile'
}

export default async function ProfilePage({params}: {params: {id: string}}) {
    const data = await getProfile(params.id);

    return <Profile {...data.data} />
}
