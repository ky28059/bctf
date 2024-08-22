'use client'

import type { ReactNode } from 'react';
import { ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';


// A reusable component to wrap a dropdown animation around a `ListboxOptions`.
export default function AnimatedListbox(props: { children: ReactNode, className?: string }) {
    return (
        <ListboxOptions
            transition
            anchor="bottom"
            // modal={false}
            className={clsx(
                'w-[var(--button-width)] data-[closed]:opacity-0 data-[enter]:duration-150 data-[enter]:data-[closed]:opacity-100 data-[leave]:duration-100 ease-out',
                props.className
            )}
        >
            {props.children}
        </ListboxOptions>
    )
}
