'use client'

import type { ReactNode } from 'react';
import type { SelectContentProps } from '@radix-ui/react-select';
import { Select } from 'radix-ui';


// A reusable component to wrap a dropdown animation around a `ListboxOptions`.
type AnimatedListboxProps = {
    children: ReactNode,
    position?: SelectContentProps['position'],
    side?: SelectContentProps['side'],
    sideOffset?: SelectContentProps['sideOffset'],
    className?: string
}
export default function AnimatedListbox(props: AnimatedListboxProps) {
    return (
        <Select.Content
            className={`transition ease-out duration-100 data-closed:opacity-0` + (props.className ? ` ${props.className}` : '')}
            position={props.position ?? 'popper'}
            side={props.side}
            sideOffset={props.sideOffset}
        >
            <Select.Viewport>
                {props.children}
            </Select.Viewport>
        </Select.Content>
    )
}
