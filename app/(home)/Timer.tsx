'use client'

import { useContext } from 'react';
import { DateTime } from 'luxon';
import { useIsMounted } from '@/hooks/useIsMounted';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


type TimerProps = {
    startTime: number,
    endTime: number
}
export default function Timer(props: TimerProps) {
    const time = useContext(CurrentTimeContext);

    const ctfStart = DateTime.fromMillis(props.startTime);
    const ctfEnd = DateTime.fromMillis(props.endTime);

    // To prevent hydration errors
    const mounted = useIsMounted();

    // If the CTF is over
    if (time > ctfEnd) return (
        <div className="mb-6">
            <div className="bg-black/15 mt-1 text-5xl sm:text-6xl font-medium px-5 py-3 rounded font-mono mb-1">
                00
                <span className="text-primary">:</span>
                00
                <span className="text-primary">:</span>
                00
                <span className="text-primary">:</span>
                00
            </div>
            <p className="text-primary text-sm text-center">
                b01lers CTF is over!
            </p>
        </div>
    );

    const diff = time > ctfStart
        ? ctfEnd.diff(time, ['days', 'hours', 'minutes', 'seconds'])
        : ctfStart.diff(time, ['days', 'hours', 'minutes', 'seconds']);

    return (
        <div className="mb-6">
            <div className="bg-black/15 mt-1 text-5xl sm:text-6xl font-medium px-5 py-3 rounded font-mono mb-1">
                {!mounted ? '00' : diff.days.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {!mounted ? '00' : diff.hours.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {!mounted ? '00' : diff.minutes.toString().padStart(2, '0')}
                <span className="text-primary">:</span>
                {!mounted ? '00' : Math.floor(diff.seconds).toString().padStart(2, '0')}
            </div>
            <p className="text-primary text-sm text-center">
                {time > ctfStart ? (
                    'left until b01lers CTF ends.'
                ) : (
                    'days until b01lers CTF.'
                )}
            </p>
        </div>
    )
}
