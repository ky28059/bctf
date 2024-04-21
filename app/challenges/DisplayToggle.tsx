'use client'

import { useContext } from 'react';
import PreferencesContext from '@/contexts/PreferencesContext';

// Icons
import { IoGrid, IoMenu } from 'react-icons/io5';


export default function DisplayToggle() {
    const { preferences, setPreferences } = useContext(PreferencesContext);

    function setGrid(grid: boolean) {
        setPreferences({ ...preferences, grid });
    }

    return (
        <div className="hidden sticky h-max -ml-2 top-32 md:flex flex-col gap-2 text-secondary">
            <button
                className={'transition duration-200 ' + (preferences.grid ? 'hover:text-primary' : 'text-white')}
                onClick={() => setGrid(false)}
            >
                <IoMenu />
            </button>

            <button
                className={'transition duration-200 ' + (!preferences.grid ? 'hover:text-primary' : 'text-white')}
                onClick={() => setGrid(true)}
            >
                <IoGrid />
            </button>
        </div>
    )
}
