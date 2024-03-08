'use client'

import {useState} from 'react';
import type {Challenge} from '@/util/challenges';
import GridChallengeModal from '@/app/challenges/GridChallengeModal';


export default function GridChallenge(props: Challenge) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="bg-black/50 px-8 py-6 rounded border border-tertiary hover:border-secondary transition duration-150 text-center focus:outline-none focus:ring-2"
                onClick={() => setOpen(true)}
            >
                <h3 className="font-medium mb-2">
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
