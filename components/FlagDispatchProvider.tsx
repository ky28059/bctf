'use client'

import {ReactNode, useRef} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import {getRandom} from '@/util/random';


export default function FlagDispatchProvider(props: {children: ReactNode}) {
    const rejectVideoRefs = useRef<HTMLVideoElement[]>([]);
    const acceptVideoRefs = useRef<HTMLVideoElement[]>([]);

    function rejectFlag() {
        const available = rejectVideoRefs.current.filter(s => !!s);
        if (!available.length) return;

        const video = getRandom(available);
        video.currentTime = 0;
        void video.play();
    }

    function acceptFlag() {
        const available = acceptVideoRefs.current.filter(s => !!s);
        if (!available.length) return;

        const video = getRandom(available);
        video.currentTime = 0;
        void video.play();
    }

    function appendToRejectVideos(r: HTMLVideoElement) {
        rejectVideoRefs.current.push(r);
    }

    function appendToAcceptVideos(r: HTMLVideoElement) {
        acceptVideoRefs.current.push(r);
    }

    return (
        <FlagDispatchContext.Provider value={{rejectFlag, acceptFlag}}>
            {Array(2).fill(0).map((_, i) => (
                <video
                    className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                    ref={appendToRejectVideos}
                    key={i}
                >
                    <source src={`/assets/videos/failed${i + 1}-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    <source src={`/assets/videos/failed${i + 1}-chrome.webm`} type="video/webm" />
                </video>
            ))}
            {Array(4).fill(0).map((_, i) => (
                <video
                    className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                    ref={appendToAcceptVideos}
                    key={i}
                >
                    <source src={`/assets/videos/success${i + 1}-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    <source src={`/assets/videos/success${i + 1}-chrome.webm`} type="video/webm" />
                </video>
            ))}

            {props.children}
        </FlagDispatchContext.Provider>
    )
}
