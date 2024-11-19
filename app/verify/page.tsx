import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Components
import VerifyButton from '@/app/verify/VerifyButton';

// Utils
import { verify } from '@/util/auth';
import { getMyProfile } from '@/util/profile';


export const metadata: Metadata = {
    title: 'Verify'
}

export default async function Verify({ searchParams }: { searchParams: Promise<{ token: string }> }) {
    const token = (await searchParams).token;
    if (!token)
        return redirect('/register');

    const res = await verify(token);
    if (res.kind === 'goodEmailSet')
        return redirect('/profile');
    if (res.kind !== 'goodRegister' && res.kind !== 'goodVerify')
        return redirect('/register');

    const profile = await getMyProfile(res.data.authToken);
    if (profile.kind !== 'goodUserData')
        return redirect('/register');

    return (
        <div className="container pt-32 pb-24 flex flex-col items-center">
            <h1 className="font-semibold text-2xl">
                Log in as <span className="text-primary">{profile.data.name}</span>?
            </h1>

            <VerifyButton authToken={res.data.authToken} />
        </div>
    )
}
