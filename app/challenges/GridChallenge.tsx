'use client'

import type {Challenge} from '@/util/challenges';


export default function GridChallenge(props: Challenge) {
    return (
        <div className="bg-black/50 px-8 py-6 rounded border border-tertiary text-center">
            <h3 className="font-medium mb-2">
                {props.name}
            </h3>
            <p className="text-primary">
                {props.points}
            </p>
        </div>
    )
}
