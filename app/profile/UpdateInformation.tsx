'use client'

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

// Components
import IconInput from '@/components/IconInput';

// Utils
import {MyProfileData, updateProfileName} from '@/util/profile';
import {AUTH_COOKIE_NAME} from '@/util/config';

// Icons
import {FaCircleUser} from 'react-icons/fa6';
import {FaEnvelopeOpen} from 'react-icons/fa';


export default function UpdateInformation(props: MyProfileData) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [division, setDivision] = useState(props.division);

    const [error, setError] = useState('');

    const {push, refresh} = useRouter();

    async function updateInfoCallback(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name === props.name && email === props.email)
            return setError('Nothing to update!');

        const token = document.cookie.match(RegExp(`${AUTH_COOKIE_NAME}=(.+?)(?:;|$)`))?.[1];
        if (!token) return push('/login');

        if (name !== props.name) {
            const res = await updateProfileName(token, name);
            if (res.kind === 'badRateLimit')
                return setError(`You are doing this too fast! Try again in ${res.data.timeLeft} ms.`)
        }

        if (email !== props.email) {
            // TODO
        }

        refresh();
    }

    return (
        <div className="bg-black/30 p-8 rounded-md">
            <h3 className="text-xl font-semibold mb-3">
                Update information
            </h3>
            <p className="text-primary text-sm mb-4">
                This will change how your team appears on the scoreboard.
                You may only change your team's name once every 10 minutes.
            </p>

            <form
                className="flex flex-col gap-2 text-sm"
                onSubmit={updateInfoCallback}
            >
                <IconInput
                    icon={FaCircleUser}
                    type="text"
                    value={name}
                    placeholder="Team name"
                    onChange={(e) => setName(e.target.value)}
                />

                <IconInput
                    icon={FaEnvelopeOpen}
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    className="px-4 py-2 rounded bg-theme-bright text-white w-max ml-auto mt-2"
                    type="submit"
                >
                    Update
                </button>
            </form>
        </div>
    )
}
