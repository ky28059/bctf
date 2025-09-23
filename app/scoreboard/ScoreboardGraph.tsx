'use client'

import { useState } from 'react';
import { DateTime } from 'luxon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { GraphEntryData } from '@/util/scoreboard';


export default function ScoreboardGraph(props: { graph: GraphEntryData[] }) {
    const [focused, setFocused] = useState<string | undefined>(undefined);

    return (
        <div className="h-128 bg-black/30 rounded p-4 sm:p-8 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis
                        dataKey="time"
                        type="number"
                        className="text-sm"
                        allowDuplicatedCategory={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(t) => DateTime.fromMillis(t).toLocaleString()}
                    />
                    <YAxis
                        dataKey="score"
                        className="text-sm"
                    />
                    <Tooltip
                        labelFormatter={(t) => DateTime.fromMillis(t).toLocaleString(DateTime.DATETIME_FULL)}
                        wrapperClassName="bg-background! border-tertiary! rounded px-4! py-2! text-sm [&>ul]:pt-1!"
                        labelClassName="text-xs pb-1 text-secondary border-b border-secondary"
                    />
                    <Legend
                        onMouseEnter={(data) => setFocused(data.value)}
                        onMouseLeave={() => setFocused(undefined)}
                    />
                    {props.graph.map((p, i) => (
                        <Line
                            dataKey="score"
                            data={p.points}
                            name={p.name}
                            key={p.id}
                            stroke={colors[i]}
                            strokeOpacity={!focused ? 1 : focused === p.name ? 1 : 0.1}
                            strokeWidth={!focused ? 1 : focused === p.name ? 2 : 1}
                            dot={{ r: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

const colors = [
    '#FF1E1E',
    '#FF3232',
    '#FF4545',
    '#FF5656',
    '#FF6565',
    '#FF7373',
    '#FF8080',
    '#FF8C8C',
    '#FF9696',
    '#FFA0A0'
]
