import Link from 'next/link';


export default function AdminChallengesPreviewAlert() {
    return (
        <div className="fixed left-12 bottom-16 bg-background rounded shadow-lg pl-6 pr-8 py-3.5 border-l-[3px] text-primary border-theme z-40">
            <p>You are previewing the challenges page as an admin.</p>
            <p className="text-xs text-secondary mt-1">
                <Link href="/admin/challs" className="hover:underline">Return to challenges</Link>
            </p>
        </div>
    )
}
