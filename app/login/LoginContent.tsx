'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';


export default function LoginContent() {
    const [token, setToken] = useState('');

    const router = useRouter();

    async function login(e: FormEvent) {
        e.preventDefault();

        // TODO: fetch rctf and such

        document.cookie = 'ctf_clearance=someHashStringIThink';
        router.push('/challenges');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={login}
        >
            <input
                className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                type="text"
                placeholder="Team token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
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
