import type {ReactNode} from 'react';
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';

// Components
import NavBar from '@/app/NavBar';
import Equalizer from '@/app/Equalizer';

// Providers
import TimeProvider from '@/components/TimeProvider';
import FilterProvider from '@/components/FilterProvider';
import PreferencesProvider from '@/components/PreferencesProvider';
import FlagDispatchProvider from '@/components/FlagDispatchProvider';

import './globals.css';
import Footer from '@/app/Footer';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        absolute: 'b01lers CTF 2024',
        template: '%s - b01lers CTF 2024'
    },
    description: 'b01lers CTF is jeopardy-style CTF hosted by the b01lers CTF team at Purdue University.',
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full overflow-y-scroll scroll-smooth">
            <body
                className="bg-gradient-to-b from-background from-25% to-theme bg-fixed text-white h-full flex flex-col"
                style={inter.style}
            >
                <TimeProvider>
                    <FilterProvider>
                        <PreferencesProvider>
                            <FlagDispatchProvider>
                                <img
                                    src="/assets/background3.webp"
                                    className="fixed top-0 -z-10 opacity-10 object-cover object-center h-screen scale-[2] animate-loop-scroll origin-bottom"
                                />

                                <NavBar />
                                {props.children}

                                <Equalizer />
                                <Footer />
                            </FlagDispatchProvider>
                        </PreferencesProvider>
                    </FilterProvider>
                </TimeProvider>
            </body>
        </html>
    )
}
