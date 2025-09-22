import type { ReactNode } from 'react';


type SponsorProps = {
    href: string,
    src: string,
    name: string,
    children: ReactNode
}
export default function Sponsor(props: SponsorProps) {
    return (
        <div className="relative flex flex-col md:flex-row gap-x-8 gap-y-6 md:items-center bg-black/30 backdrop-blur-sm rounded px-8 py-6 border border-tertiary hover:border-secondary transition duration-200">
            <a
                className="absolute inset-0"
                href={props.href}
                target="_blank"
                rel="noopener noreferrer"
            />
            <img
                className="w-48 flex-none"
                src={props.src}
                alt={props.name}
            />
            <div>
                <h3 className="font-semibold mb-2 text-lg">{props.name}</h3>
                <p className="text-sm text-primary [&_a]:relative [&_a]:z-10"> {/* TODO: hacky? */}
                    {props.children}
                </p>
            </div>
        </div>
    )
}
