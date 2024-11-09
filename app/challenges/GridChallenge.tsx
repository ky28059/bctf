'use client'

import { useState } from 'react';
import type { Challenge } from '@/util/challenges';
import GridChallengeModal from '@/app/challenges/GridChallengeModal';
import { BiCheck } from 'react-icons/bi';


export default function GridChallenge(props: Challenge & { solved: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={'px-8 py-6 rounded border transition duration-150 text-center focus:outline-none focus:ring-2 backdrop-blur-sm ' + (props.solved ? 'bg-success/20 border-success hover:bg-success/30' : 'bg-black/50 border-tertiary hover:border-secondary')}
                onClick={() => setOpen(true)}
            >
                <h3 className="font-medium mb-2 flex gap-2 items-center justify-center [overflow-wrap:anywhere]">
                    {props.solved && (
                        <BiCheck className="flex-none bg-success/40 p-0.5 mb-0.5 rounded-full" />
                    )}

                    {props.name}
                </h3>
                <p className="text-primary">
                    {props.points}
                </p>
            </button>

            <GridChallengeModal
                open={open}
                setOpen={setOpen}
                challenge={props}
            />
        </>
    )
}
