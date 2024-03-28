'use client'

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {login} from '@/util/users';

// Components
import IconInput from '@/components/IconInput';

// Icons
import {FaAddressCard} from 'react-icons/fa6';


export default function LoginContent() {
    const [teamToken, setTeamToken] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const params = useSearchParams();

    // Automatically sign in if the `token` URL search parameter is set.
    useEffect(() => {
        const token = params.get('token');
        if (!token) return;

        void loginCallback(token);
    }, [params.get('token')]);

    async function loginCallback(teamToken: string) {
        const res = await login(teamToken);

        if ('error' in res) return setError(res.error!);

        router.push('/profile');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={(e) => {
                e.preventDefault();
                void loginCallback(teamToken);
            }}
        >
            <IconInput
                icon={FaAddressCard}
                type="text"
                placeholder="Team token"
                value={teamToken}
                onChange={(e) => setTeamToken(e.target.value)}
            />

            {error && (
                <p className="text-sm text-theme-bright">
                    {error}
                </p>
            )}

            <button
                className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
                type="submit"
            >
                Log in
            </button>
        </form>
    )
}
