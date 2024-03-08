'use client'

import {FormEvent, useContext, useState} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';


export default function FlagSubmissionInput() {
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
                className="rounded-l px-3 py-2 border border-primary flex-grow bg-black/30 placeholder:text-secondary"
                placeholder="bctf{...}"
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
