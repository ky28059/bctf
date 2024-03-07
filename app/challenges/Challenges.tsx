'use client'

import Challenge from '@/app/challenges/Challenge';
import {useContext, useMemo} from 'react';
import FilterContext from '@/contexts/FilterContext';
import type {Challenge as ChallengeData} from '@/util/challenges';


type ChallengesProps = {
    challenges: ChallengeData[]
}
export default function Challenges(props: ChallengesProps) {
    const {filter} = useContext(FilterContext);

    // Filter by category if any category boxes are checked.
    const filtered = useMemo(() => {
        if (filter.categories.size === 0) return props.challenges;
        return props.challenges.filter((c) => filter.categories.has(c.category));
    }, [filter])

    return (
        <div className="flex-grow flex flex-col gap-3 min-w-0">
            {filtered.map((c) => (
                <Challenge
                    {...c}
                    key={c.name}
                />
            ))}
        </div>
    )
}
