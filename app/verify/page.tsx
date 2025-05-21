import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Components
import VerifyButton from '@/app/verify/VerifyButton';


export const metadata: Metadata = {
    title: 'Verify'
}

export default async function Verify({ searchParams }: { searchParams: Promise<{ token: string }> }) {
    const token = (await searchParams).token;
    if (!token)
        return redirect('/register');

    return (
        <div className="container pt-32 pb-24 flex flex-col items-center">
            <h1 className="font-semibold text-2xl">
                Verify your email
            </h1>

            <VerifyButton token={token} />
        </div>
    )
}
