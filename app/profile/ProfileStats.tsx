'use client'

import { useMemo } from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

// Types
import type { ProfileData } from '@/util/profile';
import type { Challenge } from '@/util/challenges';


export default function ProfileStats(props: ProfileData & { challs: Challenge[] }) {
    const data = useMemo(() => {
        const res: { [name: string]: { solves: number, total: number } } = {};

        for (const c of props.challs) {
            if (!res[c.category]) res[c.category] = { solves: 0, total: 0 };
            res[c.category].total++;
        }

        for (const c of props.solves) {
            if (!res[c.category]) res[c.category] = { solves: 0, total: 0 };
            res[c.category].solves++;
        }

        return Object.entries(res)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([name, data]) => ({ name, percent: data.solves / data.total }));
    }, [props.solves]);

    return (
        <ResponsiveContainer height={275} className="flex-none text-xs lg:!w-[350px] ml-4 lg:ml-6 lg:-my-6">
            <RadarChart data={data}>
                <PolarGrid opacity={0.5} />
                <PolarAngleAxis dataKey="name" />
                <Radar
                    dataKey="percent"
                    stroke="#c22026"
                    fill="#c22026"
                    fillOpacity={0.6}
                />
                <Tooltip
                    wrapperClassName="!bg-background rounded !border-secondary"
                    labelClassName="text-primary"
                    allowEscapeViewBox={{ x: true, y: true }}
                    formatter={(percent: number, _) => [(percent * 100).toFixed(2) + '%', 'Percent solved']}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}
