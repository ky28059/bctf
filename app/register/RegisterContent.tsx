'use client'

import { FormEvent, useState } from 'react';
import { registerWithEmailVerification } from '@/util/auth';

// Components
import IconInput from '@/components/IconInput';

// Icons
import { FaCircleUser, FaEnvelope } from 'react-icons/fa6';
import { FaEnvelopeOpen } from 'react-icons/fa';


export default function RegisterContent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);

    async function registerCallback(e: FormEvent) {
        e.preventDefault();

        if (name.length <= 1)
            return setError('Please specify a name longer than 1 character.')

        const res = await registerWithEmailVerification(email, name);
        if ('error' in res) return setError(res.error!);

        setRegistered(true);
    }

    return !registered ? (
        <>
            <h1 className="text-2xl font-bold mb-6 text-center">
                Register for b01lers internal CTF
            </h1>
            <p className="text-center text-primary mb-8">
                Please register one account per team.
            </p>

            <form
                className="flex flex-col gap-2 max-w-xl items-center mx-auto"
                onSubmit={registerCallback}
            >
                <IconInput
                    icon={FaCircleUser}
                    type="text"
                    placeholder="Team name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />

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
                    Register
                </button>
            </form>
        </>
    ) : (
        <h1 className="text-primary font-semibold text-2xl flex gap-4 items-center justify-center">
            <FaEnvelope />
            Verification email sent!
        </h1>
    )
}
