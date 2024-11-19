import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Components
import Profile from '@/app/profile/Profile';

// Utils
import { getProfile } from '@/util/profile';


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const data = await getProfile((await params).id);
    if (data.kind === 'badUnknownUser') return notFound();

    return {
        title: data.data.name
    }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const data = await getProfile((await params).id);
    if (data.kind === 'badUnknownUser') return notFound();

    return (
        <div className="container pt-32 pb-24">
            <Profile {...data.data} />
        </div>
    )
}
