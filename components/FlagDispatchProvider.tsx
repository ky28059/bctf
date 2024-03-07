'use client'

import {ReactNode, useRef} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';


export default function FlagDispatchProvider(props: {children: ReactNode}) {
    const rejectVideoRef = useRef<HTMLVideoElement>(null);
    const acceptVideoRef = useRef<HTMLVideoElement>(null);

    function rejectFlag() {
        if (!rejectVideoRef.current) return;

        rejectVideoRef.current.currentTime = 0;
        void rejectVideoRef.current.play();
    }

    function acceptFlag() {
        if (!acceptVideoRef.current) return;

        acceptVideoRef.current.currentTime = 0;
        void acceptVideoRef.current.play();
    }

    return (
        <FlagDispatchContext.Provider value={{rejectFlag, acceptFlag}}>
            <video
                className="fixed top-0 w-screen h-screen pointer-events-none z-10"
                src="/assets/videos/failed-vp9-chrome.webm"
                ref={rejectVideoRef}
            />
            <video
                className="fixed top-0 w-screen h-screen pointer-events-none z-10"
                src="/assets/videos/failed-vp9-chrome.webm" // TODO
                ref={acceptVideoRef}
            />
            {props.children}
        </FlagDispatchContext.Provider>
    )
}
