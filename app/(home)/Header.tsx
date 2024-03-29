import Timer from '@/app/(home)/Timer';
import {BsChevronCompactDown} from 'react-icons/bs';
import {getConfig} from '@/util/config';


export default async function Header() {
    const config = await getConfig();

    return (
        <header className="pt-36 container flex flex-col items-center h-screen">
            <img src="/assets/logo.svg" />
            <Timer
                startTime={config.data.startTime}
                endTime={config.data.endTime}
            />
            <p>todo</p>

            <a href="#rules" className="text-inherit text-4xl mt-12">
                <BsChevronCompactDown className="animate-bounce" />
                <span className="sr-only">Jump to Rules</span>
            </a>
        </header>
    )
}
