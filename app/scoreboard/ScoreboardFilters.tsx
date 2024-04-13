'use client'

import {useState} from 'react';
import DivisionSelector from '@/app/profile/DivisionSelector';


export default function ScoreboardFilters() {
    const [division, setDivision] = useState('all');

    return (
        <div className="bg-black/30 rounded p-6 h-max flex-none w-80 flex flex-col sticky top-20">
            <label className="text-sm text-primary mb-1.5">
                Filter by division
            </label>
            <DivisionSelector
                division={division}
                setDivision={setDivision}
                divisions={['all', 'open', 'purdue']}
            />
        </div>
    )
}
