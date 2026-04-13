'use client'

import { verify } from '@/util/auth';


type VerifyButtonProps = {
    token: string
}
export default function VerifyButton(props: VerifyButtonProps) {
    return (
        <button
            className="bg-theme-bright px-6 py-2 rounded text-white font-semibold w-max mt-4"
            onClick={() => verify(props.token)}
        >
            Log in
        </button>
    )
}
