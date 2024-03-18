'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {register} from '@/util/users';
import {AUTH_COOKIE_NAME} from '@/util/config';


export default function RegisterContent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();

    async function registerCallback(e: FormEvent) {
        e.preventDefault();

        const token = await register(email, name);
        document.cookie = `${AUTH_COOKIE_NAME}=${token}`;

        router.push('/profile');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={registerCallback}
        >
            <input
                className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                type="text"
                placeholder="Team name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
                type="submit"
            >
                Register
            </button>
        </form>
    )
}
