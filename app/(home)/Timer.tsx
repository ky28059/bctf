'use client'

import {useContext} from 'react';
import {DateTime} from 'luxon';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


const CTF_DATE = DateTime.fromISO(
    '2024-04-12',
    {zone: 'America/Indiana/Indianapolis'}
)

export default function Timer() {
    const time = useContext(CurrentTimeContext);
    const diff = CTF_DATE.diff(time, ['days', 'hours', 'minutes', 'seconds']);

    return (
        <div className="mb-6">
            <div className="bg-black/15 mt-1 text-6xl font-medium px-5 py-3 rounded select-none font-mono mb-1">
                {diff.days.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {diff.hours.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {diff.minutes.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {diff.seconds.toFixed(0).toString().padStart(2, '0')}
            </div>
            <p className="text-primary text-sm text-center">
                days until b01lers CTF.
            </p>
        </div>
    )
}
