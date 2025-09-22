'use client'

import type { ReactNode } from 'react';
import { ListboxOptions } from '@headlessui/react';


// A reusable component to wrap a dropdown animation around a `ListboxOptions`.
type AnimatedListboxProps = {
    children: ReactNode,
    modal?: boolean,
    className?: string
}
export default function AnimatedListbox(props: AnimatedListboxProps) {
    return (
        <ListboxOptions
            transition
            className={`transition ease-out duration-100 data-closed:opacity-0` + (props.className ? ` ${props.className}` : '')}
            modal={props.modal ?? false}
        >
            {props.children}
        </ListboxOptions>
    )
}
