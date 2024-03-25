import Timer from '@/app/(home)/Timer';
import {BsChevronCompactDown} from 'react-icons/bs';


export default function Header() {
    return (
        <header className="pt-36 container flex flex-col items-center h-screen">
            <img src="/assets/logo.svg" />
            <Timer />
            <p>todo</p>

            <a href="#rules" className="text-inherit text-4xl mt-12">
                <BsChevronCompactDown className="animate-bounce" />
                <span className="sr-only">Jump to Rules</span>
            </a>
        </header>
    )
}
