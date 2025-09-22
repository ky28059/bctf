import { Hubot_Sans, Martian_Mono } from 'next/font/google';
import Timer from '@/app/(home)/Timer';

// Utils
import { getConfig } from '@/util/config';

// Icons
import { BsChevronCompactDown } from 'react-icons/bs';
import { AiFillFlag } from 'react-icons/ai';


const hubot = Hubot_Sans({ subsets: ['latin'], weight: '700' });
const martian = Martian_Mono({ subsets: ['latin'], weight: '600' });

export default async function Header() {
    const config = await getConfig();

    return (
        <header className="relative container flex flex-col items-center justify-center h-screen overflow-hidden">
            {/*
            <img
                src="/assets/logo-uwu.png"
                className="-mb-7 max-h-96"
            />
            */}

            <h1
                className="flex text-5xl md:text-8xl font-bold text-white/50 bg-clip-text mb-4 mt-16 drop-shadow-md"
                style={hubot.style}
            >
                b<span style={martian.style} className="text-white/65 text-[5.6rem] mt-1.5">01</span>lers CTF
                <AiFillFlag className="text-theme ml-2" />
            </h1>
            <div className="absolute animate-mark-pivot-rotate -z-10 opacity-60">
                <img
                    src="/assets/logo-new.png"
                    className="max-h-[80vh] animate-mark-rotate drop-shadow-[0_0px_4px_#ff1e1e]"
                />
            </div>
            <p className="mb-2.5 max-w-3xl text-center text-pretty text-sm sm:text-base drop-shadow-md text-white/70">
                b01lers CTF is the public competitive CTF hosted by the b01lers CTF team at Purdue University.
                Join our discord at <a href="https://discord.gg/tBMqujE" target="_blank" rel="noopener noreferrer" className="text-white drop-shadow-[0_0_13px_rgb(20_10_0_/_0.6)] font-semibold hover:underline">discord.gg/tBMqujE</a>{' '}
                and look out for further info soon!
            </p>
            <Timer
                startTime={config.data.startTime}
                endTime={config.data.endTime}
            />

            <a href="#rules" className="absolute inset-x-0 mx-auto w-max bottom-12 text-inherit text-4xl text-primary">
                <BsChevronCompactDown className="animate-bounce" />
                <span className="sr-only">Jump to Rules</span>
            </a>
        </header>
    )
}
