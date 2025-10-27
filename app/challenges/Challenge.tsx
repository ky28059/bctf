'use client'

import { useState } from 'react';
import Markdown from 'react-markdown';
import { BiCheck } from 'react-icons/bi';

// Components
import SolvesModal from '@/app/challenges/SolvesModal';
import FlagSubmissionInput from '@/app/challenges/FlagSubmissionInput';

// Utils
import type { Challenge } from '@/util/challenges';


export default function Challenge(props: Challenge & { solved: boolean }) {
    const [showSolves, setShowSolves] = useState(false);

    return (
        <div className="bg-black/50 px-6 py-4 rounded border border-tertiary backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold wrap-anywhere flex gap-2">
                    {props.category}/{props.name}
                    {props.tags && props.tags.length > 0 && (
                        <div>
                            {props.tags.map((t) => (
                                <span key={t} className="text-xs bg-theme-bright/15 text-theme-bright rounded-full font-semibold px-2 py-0.5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </h3>

                {props.solved && (
                    <BiCheck className="flex-none bg-success/40 p-0.5 mb-0.5 rounded-full" />
                )}

                <button
                    className="text-theme-bright hover:text-theme transition duration-200 ml-auto text-right text-pretty"
                    onClick={() => setShowSolves(true)}
                >
                    {props.solves} solve{props.solves === 1 ? '' : 's'}
                    {' / '}
                    {props.points} point{props.points === 1 ? '' : 's'}
                </button>
            </div>
            <h4 className="text-sm text-primary mt-0.5">
                {props.author}
            </h4>

            <hr className="my-3 border-secondary" />

            <div className="text-sm break-words space-y-2 [&_a]:text-theme-bright [&_a:hover]:underline [&_code]:px-2 [&_code]:py-1 [&_code]:bg-black/40 [&_code]:text-primary [&_code]:rounded">
                <Markdown>
                    {props.description}
                </Markdown>
            </div>

            <FlagSubmissionInput
                challenge={props}
                solved={props.solved}
            />

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
