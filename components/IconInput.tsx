import type {InputHTMLAttributes} from 'react';
import type {IconType} from 'react-icons';


type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
    icon: IconType
}
export default function IconInput(props: IconInputProps) {
    const Icon = props.icon;

    return (
        <div className="relative w-full">
            <Icon className="absolute left-4 inset-y-0 my-auto" />
            <input
                {...props}
                className="w-full bg-black/40 pl-12 pr-4 py-2 rounded border border-secondary placeholder:text-secondary"
            />
        </div>
    )
}
