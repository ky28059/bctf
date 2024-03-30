'use client'

import {useContext} from 'react';
import PreferencesContext from '@/contexts/PreferencesContext';


export default function Footer() {
    const {preferences, setPreferences} = useContext(PreferencesContext);

    function toggleAnimations() {
        preferences.animations = !preferences.animations;
        setPreferences({...preferences});
    }

    return (
        <footer className="mt-auto text-center pb-12 text-primary text-sm hover:text-white transition duration-200">
            <p>
                b01lers CTF platform -
                Backend powered by <a href="https://rctf.redpwn.net/" target="_blank" rel="noopener noreferrer" className="underline">rCTF</a> -
                Frontend made with 🤍 by <a href="https://github.com/ky28059" target="_blank" rel="noopener noreferrer" className="underline">ky28059</a>
            </p>
            <button onClick={toggleAnimations} className="underline mt-0.5">
                {preferences.animations ? 'Disable' : 'Enable'} animations
            </button>
        </footer>
    )
}
