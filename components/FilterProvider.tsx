'use client'

import { ReactNode, useState } from 'react';
import FilterContext, { defaultFilter } from '@/contexts/FilterContext';


export default function FilterProvider(props: { children: ReactNode }) {
    const [filter, setFilter] = useState(defaultFilter);

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {props.children}
        </FilterContext.Provider>
    )
}
