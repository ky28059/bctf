'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

// Components
import IconInput from '@/components/IconInput';

// Icons
import {FaAddressCard} from 'react-icons/fa6';


export default function LoginContent() {
    const [teamToken, setTeamToken] = useState('');

    const router = useRouter();

    async function loginCallback(e: FormEvent) {
        e.preventDefault();

        await fetch('/api/passthrough/login', {
            method: 'POST',
            body: JSON.stringify({teamToken})
        });

        router.push('/profile');
        router.refresh();
    }

    return (
        <form
            className="flex flex-col gap-2 max-w-xl items-center mx-auto"
            onSubmit={loginCallback}
        >
            <IconInput
                icon={FaAddressCard}
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
