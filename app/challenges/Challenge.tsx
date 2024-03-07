'use client'

import {FormEvent, useContext, useState} from 'react';
import Markdown from 'react-markdown';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import type {Challenge} from '@/util/challenges';


export default function Challenge(props: Challenge) {
    const [flag, setFlag] = useState('');
    const {rejectFlag} = useContext(FlagDispatchContext);

    async function submitFlag(e: FormEvent) {
        e.preventDefault();
        setFlag('');
        rejectFlag(); // TODO
    }

    return (
        <div className="bg-black/50 px-6 py-4 rounded border border-tertiary">
            <div className="flex justify-between">
                <h3 className="font-semibold">
                    {props.category}/{props.name}
                </h3>

                <p className="text-theme-bright">
                    {props.solves} solves / {props.points} points
                </p>
            </div>
            <h4 className="text-sm text-primary mt-0.5">
                {props.author}
            </h4>

            <hr className="my-3 border-secondary" />

            <Markdown className="text-sm break-words space-y-2 [&_a]:text-theme-bright [&_a:hover]:underline [&_code]:px-2 [&_code]:py-1 [&_code]:bg-black/40 [&_code]:text-primary [&_code]:rounded">
                {props.description}
            </Markdown>

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

            {props.files.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 text-xs font-mono font-semibold">
                    {props.files.map((f) => (
                        <a
                            className="text-theme hover:text-theme-bright transition duration-200 bg-black/40 px-2.5 py-1 rounded"
                            href={f.url}
                        >
                            {f.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
