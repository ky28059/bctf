'use client'

import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/util/config';


type VerifyButtonProps = {
    authToken: string
}
export default function VerifyButton(props: VerifyButtonProps) {
    const router = useRouter();

    async function confirmLogin() {
        document.cookie = `${AUTH_COOKIE_NAME}=${props.authToken};`;
        router.replace('/profile');
        router.refresh();
    }

    return (
        <button
            className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
            onClick={confirmLogin}
        >
            Log in
        </button>
    )
}
