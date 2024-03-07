'use client'

import {ReactNode, useRef} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';


export default function FlagDispatchProvider(props: {children: ReactNode}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    function rejectFlag() {
        if (!videoRef.current) return;

        videoRef.current.currentTime = 0;
        void videoRef.current.play();
    }

    function acceptFlag() {
        // TODO
    }

    return (
        <FlagDispatchContext.Provider value={{rejectFlag, acceptFlag}}>
            <video
                className="fixed top-0 w-screen h-screen pointer-events-none"
                src="/assets/videos/failed-vp9-chrome.webm"
                ref={videoRef}
            />
            {props.children}
        </FlagDispatchContext.Provider>
    )
}
