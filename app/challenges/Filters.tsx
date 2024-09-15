'use client'

import { ReactNode, useContext, useMemo } from 'react';
import FilterContext from '@/contexts/FilterContext';

// Types
import type { Challenge as ChallengeData } from '@/util/challenges';
import type { Solve } from '@/util/profile';


type FiltersProps = {
    challenges: ChallengeData[],
    solves: Solve[]
}
export default function Filters(props: FiltersProps) {
    const { filter, setFilter } = useContext(FilterContext);

    function toggleShowSolved() {
        setFilter({ ...filter, showSolved: !filter.showSolved });
    }

    // Mapping of {categoryName: # of challenges in that category}
    const totals = useMemo(() => {
        const res: { [category: string]: number } = {};

        for (const c of props.challenges) {
            if (!(c.category in res)) res[c.category] = 0;
            res[c.category]++;
        }

        return res;
    }, []);

    // Mapping of {categoryName: # of solved challenges in that category}
    const solved = useMemo(() => {
        const res: { [category: string]: number } = {};

        for (const s of props.solves) {
            if (!(s.category in res)) res[s.category] = 0;
            res[s.category]++;
        }

        return res;
    }, []);

    return (
        <div className="bg-black/30 px-6 py-4 rounded w-full md:w-64 lg:w-80 flex-none h-max md:sticky top-32">
            <h2 className="font-semibold mb-1">Filters</h2>

            <div className="flex flex-col gap-1 pl-2 mb-3">
                {Object.keys(totals).sort((a, b) => a.localeCompare(b)).map((c) => (
                    <FilterCategory
                        key={c}
                        category={c}
                        totals={totals}
                        solved={solved}
                    />
                ))}
            </div>
            <div className="pl-2">
                <FilterOption checked={filter.showSolved} onChange={toggleShowSolved} name="solved">
                    Show solved
                    <span className="text-primary text-sm ml-2">
                        ({props.solves.length}/{props.challenges.length} solved)
                    </span>
                </FilterOption>
            </div>
        </div>
    )
}

type FilterCategoryProps = {
    category: string,
    totals: { [category: string]: number },
    solved: { [category: string]: number }
}
function FilterCategory(props: FilterCategoryProps) {
    const { filter, setFilter } = useContext(FilterContext);

    function toggleCategory() {
        if (filter.categories.has(props.category))
            filter.categories.delete(props.category)
        else
            filter.categories.add(props.category)

        setFilter({ ...filter });
    }

    return (
        <FilterOption
            name={props.category}
            checked={filter.categories.has(props.category)}
            onChange={toggleCategory}
        >
            {props.category}
            <span className="text-primary text-sm ml-2">
                ({props.solved[props.category] ?? 0}/{props.totals[props.category] ?? 0} solved)
            </span>
        </FilterOption>
    )
}

type FilterOptionProps = {
    name: string,
    checked: boolean,
    onChange: () => void,
    children: ReactNode
}
function FilterOption(props: FilterOptionProps) {
    return (
        <div className="flex gap-x-2 items-center flex-wrap">
            <input
                id={props.name}
                name={props.name}
                type="checkbox"
                className="accent-theme"
                checked={props.checked}
                onChange={props.onChange}
            />
            <label htmlFor={props.name}>
                {props.children}
            </label>
        </div>
    )
}
