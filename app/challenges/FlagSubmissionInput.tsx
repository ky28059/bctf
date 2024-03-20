'use client'

import {FormEvent, useContext, useState} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';


type FlagSubmissionInputProps = {
    solved?: boolean
}
export default function FlagSubmissionInput(props: FlagSubmissionInputProps) {
    const [flag, setFlag] = useState('');
    const {acceptFlag, rejectFlag} = useContext(FlagDispatchContext);

    async function submitFlag(e: FormEvent) {
        e.preventDefault();
        setFlag('');

        if (/bctf\{.+?}/.test(flag)) acceptFlag(); // TODO
        else rejectFlag();
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
