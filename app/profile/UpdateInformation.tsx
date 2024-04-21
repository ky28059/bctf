'use client'

import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import IconInput from '@/components/IconInput';
import DivisionSelector from '@/app/profile/DivisionSelector';

// Utils
import type { CTFConfig } from '@/util/config';
import { MyProfileData, updateEmail, updateProfile, UpdateProfilePayload } from '@/util/profile';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';

// Icons
import { FaCircleUser } from 'react-icons/fa6';
import { FaEnvelopeOpen } from 'react-icons/fa';


export default function UpdateInformation(props: MyProfileData & { config: CTFConfig }) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [division, setDivision] = useState(props.division);

    const { dispatchNotif } = useContext(FlagDispatchContext);
    const { refresh } = useRouter();

    async function updateInfoCallback(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name === props.name && email === props.email && division === props.division)
            return dispatchNotif('Nothing to update!', false);

        // Update name and division
        if (name !== props.name || division !== props.division) {
            const payload: UpdateProfilePayload = {};
            if (name !== props.name) payload.name = name;
            if (division !== props.division) payload.division = division;

            const res = await updateProfile(payload);
            if (res.error) return dispatchNotif(res.error, false);

            dispatchNotif('Successfully updated user information.', true);
        }

        if (email !== props.email) {
            const res = await updateEmail(email);
            if (res.error) return dispatchNotif(res.error, false);

            dispatchNotif('Confirmation email sent.', true);
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

                <DivisionSelector
                    division={division}
                    setDivision={setDivision}
                    divisions={props.allowedDivisions}
                    divisionNames={props.config.divisions}
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
