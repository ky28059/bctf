'use client'

import {useRouter} from 'next/navigation';
import {AUTH_COOKIE_NAME} from '@/util/config';


type VerifyButtonProps = {
    authToken: string
}
export default function VerifyButton(props: VerifyButtonProps) {
    const {replace, refresh} = useRouter();

    async function confirmLogin() {
        document.cookie = `${AUTH_COOKIE_NAME}=${props.authToken};`;
        replace('/profile');
        refresh();
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
