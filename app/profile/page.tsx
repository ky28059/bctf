import type {Metadata} from 'next';
import Profile from '@/app/profile/Profile';
import {getProfile} from '@/util/profile';


// TODO
export const metadata: Metadata = {
    title: 'Profile'
}

export default async function ProfilePage() {
    const data = await getProfile('e219e6b9-3d48-4694-8656-bf6657e51936'); // TODO

    return <Profile {...data.data} />
}
