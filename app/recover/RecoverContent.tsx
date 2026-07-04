'use client'

import { FormEvent, useState } from 'react';
import { recover } from '@/util/auth';

// Components
import IconInput from '@/components/IconInput';

// Icons
import { FaEnvelope } from 'react-icons/fa6';
import { FaEnvelopeOpen } from 'react-icons/fa';


export default function RecoverContent() {
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [recovered, setRecovered] = useState(false);

    async function registerCallback(e: FormEvent) {
        e.preventDefault();

        const res = await recover(email);
        if ('error' in res) return setError(res.error!);

        setRecovered(true);
    }

    return !recovered ? (
        <>
            <h1 className="text-2xl font-bold mb-8 text-center">
                Recover your b01lers internal CTF account
            </h1>

            <form
                className="flex flex-col gap-2 max-w-xl items-center mx-auto"
                onSubmit={registerCallback}
            >
                <IconInput
                    icon={FaEnvelopeOpen}
                    className="w-full bg-black/40 px-4 py-2 rounded border border-secondary"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
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
                    Recover
                </button>
            </form>
        </>
    ) : (
        <h1 className="text-primary font-semibold text-2xl flex gap-4 items-center justify-center">
            <FaEnvelope />
            Recovery email sent!
        </h1>
    )
}
