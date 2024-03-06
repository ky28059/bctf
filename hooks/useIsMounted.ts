import {useLayoutEffect, useState} from 'react';


// Utility hook to allow dynamic client components to display static data before hydration and avoid hydration errors.
export function useIsMounted() {
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}
