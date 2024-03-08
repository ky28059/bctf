'use client'

import {FormEvent, useContext, useState} from 'react';
import Markdown from 'react-markdown';
import CenteredModal from '@/components/CenteredModal';
import {FaDownload} from 'react-icons/fa';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import type {Challenge} from '@/util/challenges';


type GridChallengeModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function GridChallengeModal(props: GridChallengeModalProps) {
    const [flag, setFlag] = useState('');
    const {acceptFlag, rejectFlag} = useContext(FlagDispatchContext);

    // TODO: abstraction
    async function submitFlag(e: FormEvent) {
        e.preventDefault();
        setFlag('');

        if (/bctf\{.+?}/.test(flag)) acceptFlag(); // TODO
        else rejectFlag();
    }

    return (
        <CenteredModal
            className="relative bg-background rounded-lg p-8 text-white shadow-lg w-full max-w-xl max-h-[90%]"
            isOpen={props.open}
            setIsOpen={props.setOpen}
        >
            <h1 className="text-2xl text-center mb-2">
                {props.challenge.name}
            </h1>
            <p className="text-lg text-center text-primary mb-6">
                {props.challenge.points}
            </p>

            <Markdown className="text-sm break-words space-y-2 [&_a]:text-theme-bright [&_a:hover]:underline [&_code]:px-2 [&_code]:py-1 [&_code]:bg-black/40 [&_code]:text-primary [&_code]:rounded mb-6">
                {props.challenge.description}
            </Markdown>

            {props.challenge.files.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {props.challenge.files.map((d) => (
                        <a
                            className="bg-white/10 px-6 py-4 rounded-sm text-sm text-primary font-semibold flex gap-2 items-center"
                            href={d.url}
                        >
                            <FaDownload />
                            {d.name}
                        </a>
                    ))}
                </div>
            )}

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
        </CenteredModal>
    )
}
