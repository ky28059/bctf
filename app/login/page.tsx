import type { Metadata } from 'next';
import LoginContent from '@/app/login/LoginContent';


export const metadata: Metadata = {
    title: 'Log in'
}

export default function Login() {
    return (
        <div className="container pt-32 pb-24">
            <h1 className="text-2xl font-bold mb-8 text-center">
                Log in to b01lers CTF
            </h1>

            <LoginContent />
        </div>
    )
}
