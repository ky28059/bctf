'use client'

import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/util/config';
import { verify } from '@/util/auth';


type VerifyButtonProps = {
    token: string
}
export default function VerifyButton(props: VerifyButtonProps) {
    const router = useRouter();

    async function verifyEmail() {
        const res = await verify(props.token);
        if (res.kind === 'goodEmailSet')
            return router.push('/profile'); // TODO: display error message instead?
        if (res.kind !== 'goodRegister' && res.kind !== 'goodVerify')
            return router.push('/register');

        document.cookie = `${AUTH_COOKIE_NAME}=${res.data.authToken};`;
        router.replace('/profile');
        router.refresh();
    }

    return (
        <button
            className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
            onClick={verifyEmail}
        >
            Log in
        </button>
    )
}
