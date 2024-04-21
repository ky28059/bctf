import type { Metadata } from 'next';
import RegisterContent from '@/app/register/RegisterContent';


export const metadata: Metadata = {
    title: 'Register'
}

export default function Register() {
    return (
        <div className="container pt-32 pb-24">
            <RegisterContent />
        </div>
    )
}
