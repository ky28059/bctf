'use client'

import { useContext } from 'react';
import PreferencesContext from '@/contexts/PreferencesContext';


export default function ScrollableBackground() {
    const { preferences } = useContext(PreferencesContext);

    return (
        <img
            src="/assets/background3.webp"
            className={'fixed top-0 -z-10 opacity-10 object-cover object-center h-[max(100vh,100vw)] scale-[1.5] origin-bottom' + (preferences.animations ? ' animate-loop-scroll' : '')}
        />
    )
}
