'use client'

import type { ReactNode } from 'react';
import { useScroll } from '@/hooks/useScroll';


export default function NavWrapper(props: { children: ReactNode }) {
    const scroll = useScroll();

    return (
        <nav className={'flex justify-center pt-3 pb-2 fixed w-full overflow-x-auto top-0 transition duration-200 z-20' + (scroll > 0 ? ' bg-black/30 backdrop-blur-md' : '')}>
            {props.children}
        </nav>
    )
}
