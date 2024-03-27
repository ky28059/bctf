'use client'

import {FormEvent, useContext, useState} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';

// Utils
import type {Challenge} from '@/util/challenges';
import {useRouter} from 'next/navigation';


type FlagSubmissionInputProps = {
    challenge: Challenge
    solved?: boolean
}
export default function FlagSubmissionInput(props: FlagSubmissionInputProps) {
    const [flag, setFlag] = useState('');
    const {acceptFlag, rejectFlag} = useContext(FlagDispatchContext);

    const {refresh} = useRouter();

    async function submitFlag(e: FormEvent) {
        e.preventDefault();

        const res = await (await fetch(`/api/passthrough/challs/${props.challenge.id}/submit`, {
            method: 'POST',
            body: JSON.stringify({flag})
        })).json();
        setFlag('');

        if (res.kind === 'goodFlag') {
            acceptFlag();
            refresh();
        } else {
            // TODO: handle "ctf ended" error?
            rejectFlag();
        }
    }

    return (
        <form
            className="flex mt-3 text-sm"
            onSubmit={submitFlag}
        >
            <input
                type="text"
                className={'rounded-l px-3 py-2 border flex-grow placeholder:text-secondary focus:outline-none focus-visible:ring-[3px] transition duration-100 ' + (props.solved ? 'bg-success/10 border-success ring-success/30' : 'bg-black/30 border-primary')}
                placeholder={'bctf{...}' + (props.solved ? ' (solved)' : '')}
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-r py-2 px-3 border border-primary"
            >
                Submit
            </button>
        </form>
    )
}
