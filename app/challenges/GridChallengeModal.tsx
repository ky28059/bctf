'use client'

import Markdown from 'react-markdown';
import type {Challenge} from '@/util/challenges';

// Components
import CenteredModal from '@/components/CenteredModal';
import FlagSubmissionInput from '@/app/challenges/FlagSubmissionInput';

// Icons
import {FaDownload} from 'react-icons/fa';


type GridChallengeModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function GridChallengeModal(props: GridChallengeModalProps) {
    return (
        <CenteredModal
            className="relative bg-background rounded-lg p-10 text-white shadow-lg w-full max-w-xl max-h-[90%]"
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
                            className="bg-white/10 hover:bg-white/15 transition duration-200 px-6 py-3 rounded-sm text-sm text-primary font-semibold flex gap-2 items-center"
                            href={d.url}
                        >
                            <FaDownload />
                            {d.name}
                        </a>
                    ))}
                </div>
            )}

            <FlagSubmissionInput challenge={props.challenge} />
        </CenteredModal>
    )
}
