'use client'

import { ReactNode, useRef } from 'react';

// Utils
import FlagDispatchContext from '@/contexts/FlagDispatchContext';
import { shuffle } from '@/util/random';


export default function FlagDispatchProvider(props: { children: ReactNode }) {
    const rejectVideoRefs = useRef<HTMLVideoElement[]>([]);
    const acceptVideoRefs = useRef<HTMLVideoElement[]>([]);

    const appleBottomJeansRef = useRef<HTMLVideoElement>(null);
    const gunRef = useRef<HTMLVideoElement>(null);

    const wrongFlagsSubmitted = useRef(0);

    const rejectQueue = useRef<HTMLVideoElement[]>([]);
    const acceptQueue = useRef<HTMLVideoElement[]>([]);

    function rejectFlag() {
        if (!rejectQueue.current.length) {
            const available = rejectVideoRefs.current.filter((s) => !!s);
            if (!available.length) return;

            rejectQueue.current = shuffle(available);
        }

        // Play a special video at 15 wrong flags submitted in a row
        if (appleBottomJeansRef.current && wrongFlagsSubmitted.current === 15) {
            rejectQueue.current.unshift(appleBottomJeansRef.current);
        }

        // Play another special video at 30 wrong flags submitted in a row
        if (gunRef.current && wrongFlagsSubmitted.current >= 30) {
            rejectQueue.current.unshift(gunRef.current);
            wrongFlagsSubmitted.current = 0;
        }

        const video = rejectQueue.current.shift()!;
        video.currentTime = 0;
        void video.play();

        wrongFlagsSubmitted.current++;
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

        wrongFlagsSubmitted.current = 0;
    }

    function appendToRejectVideos(r: HTMLVideoElement) {
        rejectVideoRefs.current.push(r);
    }

    function appendToAcceptVideos(r: HTMLVideoElement) {
        acceptVideoRefs.current.push(r);
    }

    return (
        <FlagDispatchContext.Provider value={{ rejectFlag, acceptFlag }}>
            {Array(6).fill(0).map((_, i) => (
                <video
                    hidden
                    className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                    ref={appendToRejectVideos}
                    onPlay={(e) => e.currentTarget.hidden = false}
                    onEnded={(e) => e.currentTarget.hidden = true}
                    key={i}
                >
                    <source src={`/assets/videos/failed${i + 1}-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    <source src={`/assets/videos/failed${i + 1}-chrome.webm`} type="video/webm" />
                </video>
            ))}
            {Array(6).fill(0).map((_, i) => (
                <video
                    hidden
                    className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                    ref={appendToAcceptVideos}
                    onPlay={(e) => e.currentTarget.hidden = false}
                    onEnded={(e) => e.currentTarget.hidden = true}
                    key={i}
                >
                    <source src={`/assets/videos/success${i + 1}-safari.mov`} type='video/mp4; codecs="hvc1"' />
                    <source src={`/assets/videos/success${i + 1}-chrome.webm`} type="video/webm" />
                </video>
            ))}

            <video
                hidden
                className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                ref={appleBottomJeansRef}
                onPlay={(e) => e.currentTarget.hidden = false}
                onEnded={(e) => e.currentTarget.hidden = true}
            >
                <source src="/assets/videos/special-safari.mov" type='video/mp4; codecs="hvc1"' />
                <source src="/assets/videos/special-chrome.webm" type="video/webm" />
            </video>
            <video
                hidden
                className="fixed top-0 w-screen h-screen pointer-events-none z-50 object-cover object-center"
                ref={gunRef}
                onPlay={(e) => e.currentTarget.hidden = false}
                onEnded={(e) => e.currentTarget.hidden = true}
            >
                <source src="/assets/videos/special2-safari.mov" type='video/mp4; codecs="hvc1"' />
                <source src="/assets/videos/special2-chrome.webm" type="video/webm" />
            </video>

            {props.children}
        </FlagDispatchContext.Provider>
    )
}
