'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {login} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


export default function LoginContent() {
    const [teamToken, setTeamToken] = useState('');

    const router = useRouter();

    async function loginCallback(e: FormEvent) {
        e.preventDefault();

        const token = await login(teamToken);
        document.cookie = `${AUTH_COOKIE_NAME}=${token}`;

        router.push('/profile');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={loginCallback}
        >
            <input
                className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                type="text"
                placeholder="Team token"
                value={teamToken}
                onChange={(e) => setTeamToken(e.target.value)}
            />

            <button
                className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
                type="submit"
            >
                Log in
            </button>
        </form>
    )
}
