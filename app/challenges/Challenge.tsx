'use client'

import {useState} from 'react';
import Markdown from 'react-markdown';
import SolvesModal from '@/app/challenges/SolvesModal';
import type {Challenge} from '@/util/challenges';
import FlagSubmissionInput from '@/app/challenges/FlagSubmissionInput';


export default function Challenge(props: Challenge) {
    const [showSolves, setShowSolves] = useState(false);

    return (
        <div className="bg-black/50 px-6 py-4 rounded border border-tertiary">
            <div className="flex justify-between">
                <h3 className="font-semibold">
                    {props.category}/{props.name}
                </h3>

                <button
                    className="text-theme-bright hover:text-theme transition duration-200"
                    onClick={() => setShowSolves(true)}
                >
                    {props.solves} solves / {props.points} points
                </button>
            </div>
            <h4 className="text-sm text-primary mt-0.5">
                {props.author}
            </h4>

            <hr className="my-3 border-secondary" />

            <Markdown className="text-sm break-words space-y-2 [&_a]:text-theme-bright [&_a:hover]:underline [&_code]:px-2 [&_code]:py-1 [&_code]:bg-black/40 [&_code]:text-primary [&_code]:rounded">
                {props.description}
            </Markdown>

            <FlagSubmissionInput />

            {props.files.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 text-xs font-mono font-semibold">
                    {props.files.map((f) => (
                        <a
                            className="text-theme hover:text-theme-bright transition duration-200 bg-black/40 px-2.5 py-1 rounded"
                            href={f.url}
                            key={f.url}
                        >
                            {f.name}
                        </a>
                    ))}
                </div>
            )}

            <SolvesModal
                open={showSolves}
                setOpen={setShowSolves}
                challenge={props}
            />
        </div>
    )
}
