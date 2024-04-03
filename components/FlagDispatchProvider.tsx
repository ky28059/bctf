'use client'

import {Fragment, ReactElement, ReactNode, useRef, useState} from 'react';
import {Transition} from '@headlessui/react';

// Utils
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import {shuffle} from '@/util/random';


export default function FlagDispatchProvider(props: {children: ReactNode}) {
    const rejectVideoRefs = useRef<HTMLVideoElement[]>([]);
    const acceptVideoRefs = useRef<HTMLVideoElement[]>([]);

    const rejectQueue = useRef<HTMLVideoElement[]>([]);
    const acceptQueue = useRef<HTMLVideoElement[]>([]);

    const [notifs, setNotifs] = useState<ReactElement[]>([]);

    function dispatchNotif(message: string, success: boolean) {
        setNotifs((n) => [...n, <Notification success={success}>{message}</Notification>]);

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

            <div className="fixed w-screen h-screen flex flex-col gap-2 items-end justify-end py-8 px-8 pointer-events-none">
                {notifs}
            </div>

            {props.children}
        </FlagDispatchContext.Provider>
    )
}

function Notification(props: {success?: boolean, children: ReactNode}) {
    return (
        <Transition
            appear
            show
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={'bg-background rounded shadow-lg px-6 py-3.5 w-80 border-l-[3px] text-primary ' + (props.success ? 'border-success' : 'border-theme')}>
                {props.children}
            </div>
        </Transition>
    )
}
