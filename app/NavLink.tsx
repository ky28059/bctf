'use client'

import type {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';


type NavLinkProps = {
    href: string,
    children: ReactNode
}
export default function NavLink(props: NavLinkProps) {
    const pathname = usePathname();
    const active = pathname === props.href;

    return (
        <Link
            className={'px-4 py-2 border-b-2 transition duration-200 ' + (active ? 'border-theme text-theme' : 'border-secondary text-secondary hover:border-theme-dark hover:text-theme-dark')}
            href={props.href}
        >
            {props.children}
        </Link>
    )
}
