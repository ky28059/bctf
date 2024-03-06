import {useEffect, useState} from 'react';


// Returns the current vertical scroll of the window, in pixels.
export function useScroll() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        setScroll(window.scrollY);
        document.addEventListener('scroll', () => setScroll(window.scrollY));
        return () => document.removeEventListener('scroll', () => setScroll(window.scrollY));
    }, []);

    return scroll;
}
