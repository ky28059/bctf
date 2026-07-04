import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Components
import LoginContent from '@/app/login/LoginContent';


export const metadata: Metadata = {
    title: 'Log in'
}

export default async function Login({ searchParams }: { searchParams: Promise<{ token?: string, error?: string }> }) {
    const token = (await searchParams).token;
    const error = (await searchParams).error;

    // Automatically sign in if the `token` search parameter is set.
    if (token) return redirect(`/login-handler?token=${encodeURIComponent(token)}`)

    return (
        <div className="container pt-32 pb-24">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Log in to b01lers internal CTF
            </h1>

            <LoginContent error={error} />
        </div>
    )
}
