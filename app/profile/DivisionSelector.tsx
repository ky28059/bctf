'use client'

import { Select } from 'radix-ui';
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
        <Select.Root
            value={props.division}
            onValueChange={(d) => d && props.setDivision(d)} // https://github.com/radix-ui/primitives/issues/3249
        >
            <Select.Trigger className="relative text-left w-full bg-black/40 pl-12 pr-4 py-2 rounded border border-secondary">
                <FaAddressBook className="absolute left-4 inset-y-0 my-auto" />
                <Select.Value aria-label={props.division}>
                    {props.divisionNames[props.division]}
                </Select.Value>
                <PiCaretUpDown className="absolute right-2 inset-y-0 my-auto text-secondary" />
            </Select.Trigger>

            <AnimatedListbox
                className="w-(--radix-popper-anchor-width) text-sm bg-background shadow-lg overflow-hidden rounded divide-y divide-tertiary z-10"
                side="bottom"
                sideOffset={5}
            >
                <Select.Group>
                    <Select.Label className="px-6 py-1 text-secondary select-none">
                        Division
                    </Select.Label>

                    {props.divisions.map((d) => (
                        <Select.Item
                            className="px-6 py-1 cursor-pointer outline-none text-primary hover:text-white hover:bg-blue-500/30 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white transition duration-200"
                            value={d}
                            key={d}
                        >
                            {props.divisionNames[d]}
                        </Select.Item>
                    ))}
                </Select.Group>
            </AnimatedListbox>
        </Select.Root>
    )
}
