'use client'

import { Listbox, ListboxButton, ListboxOption } from '@headlessui/react';
import AnimatedListbox from '@/components/AnimatedListbox';

// Icons
import { FaAddressBook } from 'react-icons/fa6';
import { PiCaretUpDown } from 'react-icons/pi';


type DivisionSelectorProps = {
    division: string,
    setDivision: (d: string) => void,
    divisions: string[],
    divisionNames: { [id: string]: string }
}
export default function DivisionSelector(props: DivisionSelectorProps) {
    return (
        <Listbox
            as="div"
            className="w-full relative"
            value={props.division}
            onChange={props.setDivision}
        >
            <ListboxButton className="relative text-left w-full bg-black/40 pl-12 pr-4 py-2 rounded border border-secondary">
                <FaAddressBook className="absolute left-4 inset-y-0 my-auto" />
                {props.divisionNames[props.division]}
                <PiCaretUpDown className="absolute right-2 inset-y-0 my-auto text-secondary" />
            </ListboxButton>

            <AnimatedListbox className="absolute text-sm w-full mt-0.5 bg-background shadow-lg overflow-hidden rounded divide-y divide-tertiary z-10">
                <p className="px-6 py-1 text-secondary select-none">
                    Division
                </p>

                {props.divisions.map((d) => (
                    <ListboxOption
                        className="px-6 py-1 cursor-pointer text-primary hover:text-white hover:bg-blue-500/30 data-selected:bg-blue-500 data-selected:text-white transition duration-200"
                        value={d}
                        key={d}
                    >
                        {props.divisionNames[d]}
                    </ListboxOption>
                ))}
            </AnimatedListbox>
        </Listbox>
    )
}
