'use client'

import {useContext, useMemo} from 'react';

// Components
import Challenge from '@/app/challenges/Challenge';
import GridChallenge from '@/app/challenges/GridChallenge';

// Contexts
import FilterContext from '@/contexts/FilterContext';
import PreferencesContext from '@/contexts/PreferencesContext';

// Utils
import type {Challenge as ChallengeData} from '@/util/challenges';


type ChallengesProps = {
    challenges: ChallengeData[]
}
export default function Challenges(props: ChallengesProps) {
    const {filter} = useContext(FilterContext);
    const {preferences} = useContext(PreferencesContext);

    // Filter by category if any category boxes are checked.
    const filtered = useMemo(() => {
        const res = (filter.categories.size === 0)
            ? props.challenges
            : props.challenges.filter((c) => filter.categories.has(c.category));

        return res.toSorted((a, b) => a.points - b.points);
    }, [filter])

    // Group challenges by category for grid layout
    // TODO: abstraction with `Filters`, efficiency?
    const grouped = useMemo(() => {
        const res: {[category: string]: ChallengeData[]} = {};

        for (const c of filtered) {
            if (!(c.category in res)) res[c.category] = [];
            res[c.category].push(c);
        }

        return res;
    }, [filtered]);

    return (
        <div className="flex flex-col gap-3 flex-grow min-w-0">
            {preferences.grid ? Object.entries(grouped).map(([category, challs]) => (
                <section>
                    <h2 className="text-2xl font-mono mb-3">
                        {category}
                    </h2>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                        {challs.map((c) => (
                            <GridChallenge
                                {...c}
                                key={c.id}
                            />
                        ))}
                    </div>
                </section>
            )) : filtered.map((c) => (
                <Challenge
                    {...c}
                    key={c.id}
                />
            ))}
        </div>
    )
}
