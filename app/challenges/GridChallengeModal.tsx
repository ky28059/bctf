'use client'

import type { ReactNode } from 'react';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import Markdown from 'react-markdown';
import type { Challenge } from '@/util/challenges';

// Components
import CenteredModal from '@/components/CenteredModal';
import FlagSubmissionInput from '@/app/challenges/FlagSubmissionInput';
import SolvesContent from '@/app/challenges/SolvesContent';

// Icons
import { FaDownload } from 'react-icons/fa';


type GridChallengeModalProps = {
    open: boolean,
    setOpen: (b: boolean) => void,
    challenge: Challenge
}
export default function GridChallengeModal(props: GridChallengeModalProps) {
    return (
        <CenteredModal
            className="relative bg-background rounded-lg p-10 text-white shadow-lg w-full max-w-xl max-h-[90%]"
            isOpen={props.open}
            setIsOpen={props.setOpen}
        >
            <TabGroup>
                <TabList className="mb-6 flex">
                    <ChallengeTab>Challenge</ChallengeTab>
                    <ChallengeTab>
                        {props.challenge.solves} Solve{props.challenge.solves === 1 ? '' : 's'}
                    </ChallengeTab>
                    <div className="border-b border-secondary grow" />
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <h1 className="text-2xl text-center mb-2 wrap-anywhere">
                            {props.challenge.name}
                        </h1>
                        {props.challenge.tags && props.challenge.tags.length > 0 && (
                            <div className="flex gap-1.5 justify-center mb-1">
                                {props.challenge.tags.map((t) => (
                                    <span key={t} className="text-xs bg-theme-bright/30 text-theme-bright rounded-full font-semibold px-2 py-0.5">
                                        {t}
                                    </span>
                                ))}
                                {/*
                                {props.challenge.difficulty && (
                                    <span className="text-sm bg-theme-bright/30 text-theme-bright rounded-full font-semibold px-2 py-0.5">
                                        {props.challenge.difficulty}
                                    </span>
                                )}
                                */}
                            </div>
                        )}
                        <p className="text-lg text-center text-primary mb-6">
                            {props.challenge.points}
                        </p>

                        <div className="text-sm break-words space-y-2 [&_a]:text-theme-bright [&_a:hover]:underline [&_code]:px-2 [&_code]:py-1 [&_code]:bg-black/40 [&_code]:text-primary [&_code]:rounded mb-6">
                            <Markdown>
                                {props.challenge.description}
                            </Markdown>
                        </div>

                        {props.challenge.files.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {props.challenge.files.map((d) => (
                                    <a
                                        className="bg-white/10 hover:bg-white/15 transition duration-200 px-6 py-3 rounded-sm text-sm text-primary font-semibold flex gap-2 items-center"
                                        href={d.url}
                                        key={d.name + d.url}
                                    >
                                        <FaDownload />
                                        {d.name}
                                    </a>
                                ))}
                            </div>
                        )}

                        <FlagSubmissionInput challenge={props.challenge} />
                    </TabPanel>

                    <TabPanel>
                        <SolvesContent challenge={props.challenge} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </CenteredModal>
    )
}

function ChallengeTab(props: { children: ReactNode }) {
    return (
        <Tab className="rounded-t border-b text-primary aria-selected:border-t aria-selected:border-x aria-selected:border-b-transparent aria-selected:text-white transition-[color] duration-200 border-secondary px-4 py-2 focus:outline-none">
            {props.children}
        </Tab>
    )
}
