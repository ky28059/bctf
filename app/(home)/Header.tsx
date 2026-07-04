import { BsChevronCompactDown } from 'react-icons/bs';
import { getConfig } from '@/util/config';


export default async function Header() {
    const config = await getConfig();

    return (
        <header className="container flex flex-col items-center justify-center h-screen">
            <img
                src="/assets/logo-internal.png"
                className="max-h-96"
            />
            <p className="mb-2 max-w-3xl text-center text-pretty">
                Welcome to b01lers internal CTF! b01lers internal CTF is both a training camp to sharpen your CTF
                skills, and a look at past b01lers CTF challenges. Check out the{' '}
                <a href="https://discord.gg/tBMqujE" target="_blank" rel="noopener noreferrer" className="text-theme-bright hover:underline">Discord</a>{' '}
                and enjoy!
            </p>

            <a href="#rules" className="text-inherit text-4xl mt-6 sm:mb-8 text-primary">
                <BsChevronCompactDown className="animate-bounce" />
                <span className="sr-only">Jump to Rules</span>
            </a>
        </header>
    )
}
