import type {ReactNode} from 'react';

export default function Filters() {
    return (
        <div className="bg-black/20 px-6 py-4 rounded w-80 h-max">
            <h2 className="font-semibold mb-1">Filters</h2>

            <div className="flex flex-col gap-1 pl-2">
                <FilterOption>crypto</FilterOption>
                <FilterOption>misc</FilterOption>
                <FilterOption>pwn</FilterOption>
                <FilterOption>rev</FilterOption>
                <FilterOption>web</FilterOption>
            </div>
        </div>
    )
}

type FilterOptionProps = {children: ReactNode}
function FilterOption(props: FilterOptionProps) {
    return (
        <div className="flex gap-2">
            <input
                type="checkbox"
                className="accent-theme"
            />
            {props.children}
        </div>
    )
}
