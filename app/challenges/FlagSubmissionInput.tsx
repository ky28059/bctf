'use client'

import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';

// Utils
import type { Challenge } from '@/util/challenges';
import { attemptSubmit } from '@/util/flags';


type FlagSubmissionInputProps = {
    challenge: Challenge
    solved?: boolean
}
export default function FlagSubmissionInput(props: FlagSubmissionInputProps) {
    const [flag, setFlag] = useState('');
    const { acceptFlag, rejectFlag, dispatchNotif } = useContext(FlagDispatchContext);

    const router = useRouter();

    async function submitFlag(e: FormEvent) {
        e.preventDefault();

        const res = await attemptSubmit(props.challenge.id, flag);
        setFlag('');

        if (res.kind === 'goodFlag') {
            acceptFlag();
            router.refresh();
        } else if (res.kind === 'badFlag') {
            rejectFlag();
        } else {
            dispatchNotif(res.message!, false);
        }
    }

    return (
        <form
            className="flex mt-3 text-sm"
            onSubmit={submitFlag}
        >
            <input
                type="text"
                className={'rounded-l px-3 py-2 border grow placeholder:text-secondary focus:outline-none focus-visible:ring-[3px] transition duration-100 ' + (props.solved ? 'bg-success/10 border-success ring-success/30' : 'bg-black/30 border-primary')}
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
