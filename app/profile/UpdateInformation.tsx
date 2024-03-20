'use client'

import {FormEvent, useState} from 'react';
import type {MyProfileData} from '@/util/profile';

// Components
import IconInput from '@/components/IconInput';

// Icons
import {FaCircleUser} from 'react-icons/fa6';
import {FaEnvelopeOpen} from 'react-icons/fa';


export default function UpdateInformation(props: MyProfileData) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [division, setDivision] = useState(props.division);

    async function updateInfoCallback(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO
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
