import type {Metadata} from 'next';
import {verify} from '@/util/auth';
import {getMyProfile} from '@/util/profile';
import {redirect} from 'next/navigation';
import VerifyButton from '@/app/verify/VerifyButton';


export const metadata: Metadata = {
    title: 'Verify'
}

export default async function Verify({searchParams}: {searchParams: {token: string}}) {
    if (!searchParams.token)
        return redirect('/register');

    const res = await verify(searchParams.token);
    if (res.kind !== 'goodRegister')
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
