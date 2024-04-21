import { ReactNode } from 'react';
import { FaHashtag } from 'react-icons/fa6';


export default function SectionHeader(props: { id: string, children: ReactNode }) {
    return (
        <div className="relative">
            <span id={props.id} className="absolute -top-24" />
            <a
                className="group flex gap-2 mb-3 items-center hover:underline decoration-1 underline-offset-4 decoration-secondary decoration-dotted"
                href={`#${props.id}`}
            >
                <h2 className="font-bold text-2xl">
                    {props.children}
                </h2>
                <FaHashtag className="hidden group-hover:block absolute right-full mr-2 text-lg text-secondary" />
            </a>
        </div>
    )
}
