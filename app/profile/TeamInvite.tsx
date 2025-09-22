'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BsChevronUp } from 'react-icons/bs';


export default function TeamInvite(props: { token: string }) {
    const url = `https://b01lersc.tf/login?token=${encodeURIComponent(props.token)}`;

    function copy() {
        void navigator.clipboard.writeText(url);
    }

    return (
        <div className="bg-black/30 p-8 rounded-md">
            <h3 className="text-xl font-semibold mb-3">
                Team invite
            </h3>
            <p className="text-primary text-sm mb-4">
                Send this invite URL to your teammates so they can log in.
            </p>

            <Disclosure as="div" className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <DisclosureButton className="group w-full flex items-center gap-2 bg-black/30 px-3 py-2 rounded text-primary text-sm font-semibold hover:text-white hover:bg-black/40 transition duration-200">
                        Reveal
                        <BsChevronUp className="bg-black/30 p-0.5 rounded-full ml-auto group-aria-expanded:rotate-180 transition duration-200" />
                    </DisclosureButton>

                    <button
                        className="bg-black/30 px-3 py-2 rounded text-primary text-sm font-semibold h-max hover:text-white hover:bg-black/40 transition duration-200"
                        onClick={copy}
                    >
                        Copy
                    </button>
                </div>

                <DisclosurePanel className="break-words text-sm px-6 py-3 bg-black/20 border-l-[3px] border-secondary rounded select-all">
                    {url}
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}
