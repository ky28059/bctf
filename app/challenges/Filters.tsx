'use client'

import {ReactNode, useContext, useMemo} from 'react';
import FilterContext from '@/contexts/FilterContext';
import type {Challenge as ChallengeData} from '@/util/challenges';


type FiltersProps = {
    challenges: ChallengeData[]
}
export default function Filters(props: FiltersProps) {
    const {filter, setFilter} = useContext(FilterContext);

    function toggleShowSolved() {
        setFilter({...filter, showSolved: !filter.showSolved});
    }

    // Mapping of {categoryName: # of challenges in that category}
    const counts = useMemo(() => {
        const res: {[category: string]: number} = {};

        for (const c of props.challenges) {
            if (!(c.category in res)) res[c.category] = 0;
            res[c.category]++;
        }

        return res;
    }, []);

    return (
        <div className="bg-black/30 px-6 py-4 rounded w-80 flex-none h-max sticky top-32">
            <h2 className="font-semibold mb-1">Filters</h2>

            <div className="flex flex-col gap-1 pl-2 mb-3">
                <FilterCategory category="crypto" counts={counts} />
                <FilterCategory category="misc" counts={counts} />
                <FilterCategory category="pwn" counts={counts} />
                <FilterCategory category="rev" counts={counts} />
                <FilterCategory category="web" counts={counts} />
            </div>
            <div className="pl-2">
                <FilterOption checked={filter.showSolved} onChange={toggleShowSolved}>
                    Show solved
                    <span className="text-primary text-sm">
                        (0/{props.challenges.length} solved)
                    </span>
                </FilterOption>
            </div>
        </div>
    )
}

type FilterCategoryProps = {
    category: string,
    counts: { [category: string]: number}
}
function FilterCategory(props: FilterCategoryProps) {
    const {filter, setFilter} = useContext(FilterContext);

    function toggleCategory() {
        if (filter.categories.has(props.category))
            filter.categories.delete(props.category)
        else
            filter.categories.add(props.category)

        setFilter({...filter});
    }

    return (
        <FilterOption
            checked={filter.categories.has(props.category)}
            onChange={toggleCategory}
        >
            {props.category}
            <span className="text-primary text-sm">
                (0/{props.counts[props.category]} solved)
            </span>
        </FilterOption>
    )
}

type FilterOptionProps = {
    checked: boolean,
    onChange: () => void,
    children: ReactNode
}
function FilterOption(props: FilterOptionProps) {
    return (
        <div className="flex gap-2 items-center">
            <input
                type="checkbox"
                className="accent-theme"
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.children}
        </div>
    )
}
