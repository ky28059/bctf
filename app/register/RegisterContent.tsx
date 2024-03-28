'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {register} from '@/util/users';

// Components
import IconInput from '@/components/IconInput';

// Icons
import {FaCircleUser} from 'react-icons/fa6';
import {FaEnvelopeOpen} from 'react-icons/fa';


export default function RegisterContent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const router = useRouter();

    async function registerCallback(e: FormEvent) {
        e.preventDefault();

        const res = await register(email, name);

        if ('error' in res) return setError(res.error!);

        router.push('/profile');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={registerCallback}
        >
            <IconInput
                icon={FaCircleUser}
                type="text"
                placeholder="Team name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <IconInput
                icon={FaEnvelopeOpen}
                className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Register
            </button>
        </form>
    )
}
