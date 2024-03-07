'use client'

import {useScroll} from '@/hooks/useScroll';
import NavLink from '@/app/NavLink';


export default function NavBar() {
    const scroll = useScroll();

    return (
        <nav className={'flex justify-center pt-3 pb-2 fixed w-full top-0 transition duration-200 z-20' + (scroll > 0 ? ' bg-black/30 backdrop-blur-md' : '')}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scoreboard">Scoreboard</NavLink>
            <NavLink href="/challenges">Challenges</NavLink>
            <NavLink href="/profile">Profile</NavLink>
        </nav>
    )
}
