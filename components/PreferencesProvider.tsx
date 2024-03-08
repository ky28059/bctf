'use client'

import {ReactNode, useState} from 'react';
import PreferencesContext, {defaultPreferences} from '@/contexts/PreferencesContext';


export default function PreferencesProvider(props: {children: ReactNode}) {
    const [preferences, setPreferences] = useState(defaultPreferences);

    return (
        <PreferencesContext.Provider value={{preferences, setPreferences}}>
            {props.children}
        </PreferencesContext.Provider>
    )
}
