import type { ReactNode } from 'react';
import { HoverCard } from 'radix-ui';


type SponsorProps = {
    href: string,
    src: string,
    name: string,
    children: ReactNode
}
export default function Sponsor(props: SponsorProps) {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                <a
                    className="ImageTrigger"
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="max-w-56 h-24 object-contain flex-none"
                        src={props.src}
                        alt={props.name}
                    />
                </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className="bg-background rounded-lg shadow-2xl px-6 pt-4 pb-6 max-w-sm" sideOffset={5}>
                    <img
                        className="w-full h-20 object-contain flex-none"
                        src={props.src}
                        alt={props.name}
                    />

                    <h3 className="font-semibold mb-1.5 text-lg">{props.name}</h3>

                    <p className="text-sm text-primary">
                        {props.children}
                    </p>

                    <HoverCard.Arrow className="HoverCardArrow" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}
