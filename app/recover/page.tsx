import type { Metadata } from 'next';
import RecoverContent from '@/app/recover/RecoverContent';


export const metadata: Metadata = {
    title: 'Recover your account'
}

export default function Recover() {
    return (
        <div className="container pt-32 pb-24">
            <RecoverContent />
        </div>
    )
}
