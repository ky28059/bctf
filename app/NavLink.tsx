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
        <Link href={props.href} className="px-3 py-2">
            {props.children}
        </Link>
    )
}
