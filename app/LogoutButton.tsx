'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/util/auth';

// Components
import CenteredModal from '@/components/CenteredModal';


export default function LogoutButton() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function logoutCallback() {
        setOpen(false);
        await logout();
        router.refresh();
    }

    return (
        <>
            <button
                className="flex-none px-4 py-2 border-b-2 transition duration-200 border-primary text-primary hover:border-white hover:text-white"
                onClick={() => setOpen(true)}
            >
                Log out
            </button>

            <CenteredModal
                className="relative bg-background rounded-lg px-12 py-8 text-white shadow-lg w-full max-w-xl max-h-[90%]"
                isOpen={open}
                setIsOpen={setOpen}
            >
                <h1 className="text-2xl font-bold mb-4">
                    Log out
                </h1>
                <p className="text-primary mb-4">
                    This will log you out on your current device.
                </p>

                <div className="flex gap-2 justify-end">
                    <button
                        className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-background transition duration-100"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="border border-theme-bright text-theme-bright px-4 py-2 rounded hover:bg-theme-bright hover:text-background transition duration-100"
                        onClick={logoutCallback}
                    >
                        Log out
                    </button>
                </div>
            </CenteredModal>
        </>
    )
}
