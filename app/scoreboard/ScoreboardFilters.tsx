'use client'

import DivisionSelector from '@/app/profile/DivisionSelector';
import type { CTFConfig } from '@/util/config';


type ScoreboardFiltersProps = {
    division: string,
    setDivision: (s: string) => void,
    config: CTFConfig
}
export default function ScoreboardFilters(props: ScoreboardFiltersProps) {
    return (
        <div className="bg-black/30 rounded p-6 h-max flex-none w-full lg:w-72 xl:w-80 flex flex-col lg:sticky lg:top-20">
            <label className="text-sm text-primary mb-1.5">
                Filter by division
            </label>
            <DivisionSelector
                {...props}
                divisions={['all', ...Object.keys(props.config.divisions)]}
                divisionNames={{ all: 'All', ...props.config.divisions }}
            />
        </div>
    )
}
