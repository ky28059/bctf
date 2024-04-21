'use client'

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PreferencesContext, { defaultPreferences } from '@/contexts/PreferencesContext';


export default function PreferencesProvider(props: { children: ReactNode }) {
    const [preferences, setPreferences] = useState(defaultPreferences);
    const hasRetrievedPreferences = useRef(false);

    useLayoutEffect(() => {
        // TODO: better way of doing this?
        if (!hasRetrievedPreferences.current) {
            hasRetrievedPreferences.current = true;

            const raw = localStorage.getItem('preferences');
            if (!raw) return;
            setPreferences({ ...defaultPreferences, ...JSON.parse(raw) }) // TODO: eventually need deepmerge here

            return;
        }

        localStorage.setItem('preferences', JSON.stringify(preferences));
    }, [preferences])

    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
            {props.children}
        </PreferencesContext.Provider>
    )
}
