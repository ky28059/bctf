import type {Metadata} from 'next';
import {notFound} from 'next/navigation';

// Components
import Profile from '@/app/profile/Profile';

// Utils
import {getProfile} from '@/util/profile';


// TODO
export const metadata: Metadata = {
    title: 'Profile'
}

export default async function ProfilePage({params}: {params: {id: string}}) {
    const data = await getProfile(params.id);

    if (data.kind === 'badUnknownUser') return notFound();

    return (
        <div className="container pt-32 pb-24">
            <Profile {...data.data} />
        </div>
    )
}
