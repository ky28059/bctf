import type {ReactNode} from 'react';


type SponsorProps = {
    href: string,
    src: string,
    name: string,
    children: ReactNode
}
export default function Sponsor(props: SponsorProps) {
    return (
        <a
            className="flex gap-8 items-center bg-black/30 backdrop-blur-sm rounded px-8 py-6 border border-tertiary hover:border-secondary transition duration-200"
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                className="w-48 h-max flex-none"
                src={props.src}
                alt={props.name}
            />
            <div>
                <h3 className="font-semibold mb-2 text-lg">{props.name}</h3>
                <p className="text-sm text-primary">
                    {props.children}
                </p>
            </div>
        </a>
    )
}
