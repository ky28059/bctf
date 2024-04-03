'use client'

import {ReactElement, ReactNode, useRef, useState} from 'react';
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import {shuffle} from '@/util/random';


export default function FlagDispatchProvider(props: {children: ReactNode}) {
    const rejectVideoRefs = useRef<HTMLVideoElement[]>([]);
    const acceptVideoRefs = useRef<HTMLVideoElement[]>([]);

    const rejectQueue = useRef<HTMLVideoElement[]>([]);
    const acceptQueue = useRef<HTMLVideoElement[]>([]);

    const [notifs, setNotifs] = useState<ReactElement[]>([]);

    function dispatchNotif(message: string) {
        setNotifs((n) => [...n, <Notification>{message}</Notification>]);

        setTimeout(() => setNotifs((n) => {
            n.shift();
            return [...n];
        }), 5000);
    }

    function rejectFlag() {
        if (!rejectQueue.current.length) {
            const available = rejectVideoRefs.current.filter((s) => !!s);
            if (!available.length) return;

            rejectQueue.current = shuffle(available);
        }

        const video = rejectQueue.current.shift()!;
        video.currentTime = 0;
        void video.play();
    }

    function acceptFlag() {
        if (!acceptQueue.current.length) {
            const available = acceptVideoRefs.current.filter((s) => !!s);
            if (!available.length) return;

            acceptQueue.current = shuffle(available);
        }

        const video = acceptQueue.current.shift()!;
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
        <FlagDispatchContext.Provider value={{rejectFlag, acceptFlag, dispatchNotif}}>
            {Array(4).fill(0).map((_, i) => (
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

            <div className="fixed w-screen h-screen flex flex-col items-end justify-end py-8 px-8">
                {notifs}
            </div>

            {props.children}
        </FlagDispatchContext.Provider>
    )
}

function Notification(props: {children: ReactNode}) {
    return (
        <div className="bg-background rounded shadow-lg px-6 py-4 w-72 text-primary">
            {props.children}
        </div>
    )
}
