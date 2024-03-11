import type {Metadata} from 'next';
import RegisterContent from '@/app/register/RegisterContent';


export const metadata: Metadata = {
    title: 'Register'
}

export default function Register() {
    return (
        <div className="container pt-32 pb-24">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Register for b01lers CTF
            </h1>
            <p className="text-center text-primary mb-8">
                Please register one account per team.
            </p>

            <RegisterContent />
        </div>
    )
}
