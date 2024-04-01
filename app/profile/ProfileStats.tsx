'use client'

import {useMemo} from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    ResponsiveContainer
} from 'recharts';
import type {ProfileData} from '@/util/profile';


export default function ProfileStats(props: ProfileData) {
    const data = useMemo(() => {
        const res: { name: string, points: number, solves: number, fullMark: number }[] = [];

        for (const c of props.solves) {
            const entry = res.find((d) => d.name === c.category);
            if (!entry) {
                res.push({name: c.category, points: c.points, solves: 1, fullMark: 9});
            } else {
                entry.points += c.points;
                entry.solves++;
            }
        }

        return res;
    }, [props.solves]);

    return (
        <ResponsiveContainer height={300} className="text-xs -my-6">
            <RadarChart data={data}>
                <PolarGrid opacity={0.5} />
                <PolarAngleAxis dataKey="name" />
                <Radar
                    dataKey="solves"
                    stroke="#C51E3A"
                    fill="#C51E3A"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    )
}
