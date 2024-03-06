'use client'

import {ReactNode, useContext} from 'react';
import FilterContext from '@/contexts/FilterContext';


export default function Filters() {
    const {filter, setFilter} = useContext(FilterContext);

    function toggleShowSolved() {
        setFilter({...filter, showSolved: !filter.showSolved});
    }

    return (
        <div className="bg-black/30 px-6 py-4 rounded w-80 h-max sticky top-32">
            <h2 className="font-semibold mb-1">Filters</h2>

            <div className="flex flex-col gap-1 pl-2 mb-3">
                <FilterCategory category="crypto" />
                <FilterCategory category="misc" />
                <FilterCategory category="pwn" />
                <FilterCategory category="rev" />
                <FilterCategory category="web" />
            </div>
            <div className="pl-2">
                <FilterOption checked={filter.showSolved} onChange={toggleShowSolved}>
                    Show solved
                </FilterOption>
            </div>
        </div>
    )
}

type FilterCategoryProps = {category: string}
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
        <div className="flex gap-2">
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
