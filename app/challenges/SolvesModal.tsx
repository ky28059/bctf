'use client'

import CenteredModal from '@/components/CenteredModal';
import SolvesContent from '@/app/challenges/SolvesContent';

// Utils
import type { Challenge } from '@/util/challenges';


type SolvesModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function SolvesModal(props: SolvesModalProps) {
    return (
        <CenteredModal
            className="relative bg-background rounded-lg px-8 py-6 text-white shadow-lg w-full max-w-xl max-h-[90%]"
            isOpen={props.open}
            setIsOpen={props.setOpen}
        >
            <h1 className="flex gap-2 items-center text-2xl font-bold mb-4 wrap-anywhere">
                Solves for {props.challenge.name}

                <span className="flex-none text-sm px-2 py-0.5 bg-theme-bright/25 text-theme-bright font-semibold rounded-full">
                    {props.challenge.category}
                </span>
            </h1>

            <SolvesContent challenge={props.challenge} />
        </CenteredModal>
    )
}
