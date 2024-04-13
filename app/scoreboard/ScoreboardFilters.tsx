'use client'

import DivisionSelector from '@/app/profile/DivisionSelector';


type ScoreboardFiltersProps = {
    division: string,
    setDivision: (s: string) => void
}
export default function ScoreboardFilters(props: ScoreboardFiltersProps) {
    return (
        <div className="bg-black/30 rounded p-6 h-max flex-none w-80 flex flex-col sticky top-20">
            <label className="text-sm text-primary mb-1.5">
                Filter by division
            </label>
            <DivisionSelector
                {...props}
                divisions={['all', 'open', 'purdue']}
            />
        </div>
    )
}
