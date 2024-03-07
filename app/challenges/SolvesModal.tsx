'use client'

import {useEffect, useState} from 'react';

// Components
import CenteredModal from '@/components/CenteredModal';
import Solve from '@/app/challenges/Solve';

// Utils
import type {Challenge} from '@/util/challenges';
import {getSolves, SolveData} from '@/util/solves';


type SolvesModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function SolvesModal(props: SolvesModalProps) {
    const [solves, setSolves] = useState<SolveData[]>([]);

    useEffect(() => {
        if (!props.open) return;
        getSolves(props.challenge.id, 0).then((r) => setSolves(r.data.solves));
    }, [props.open])

    return (
        <CenteredModal
            className="relative bg-background rounded-lg px-8 py-6 text-white shadow-lg"
            isOpen={props.open}
            setIsOpen={props.setOpen}
        >
            <h1 className="flex gap-2 items-center text-2xl font-bold mb-4">
                Solves for {props.challenge.name}

                <span className="text-sm px-2 py-0.5 bg-theme-bright/25 text-theme-bright font-semibold rounded-full">
                    {props.challenge.category}
                </span>
            </h1>

            <div className="table w-full">
                <div className="table-header-group">
                    <div className="table-row font-semibold">
                        <div className="table-cell p-2 border-b border-secondary text-right">#</div>
                        <div className="table-cell p-2 border-b border-secondary">Team</div>
                        <div className="table-cell p-2 border-b border-secondary">Solve time</div>
                    </div>
                </div>

                {solves.map((s, i) => (
                    <Solve
                        {...s}
                        rank={i + 1}
                        key={s.id}
                    />
                ))}
            </div>
        </CenteredModal>
    )
}
