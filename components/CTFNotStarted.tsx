import { FaRegClock } from 'react-icons/fa6';


export default function CTFNotStarted() {
    return (
        <div className="flex gap-x-6 gap-y-2 h-full flex-wrap text-primary justify-center items-center">
            <FaRegClock className="text-5xl" />
            <div>
                <h1 className="font-semibold text-2xl">
                    b01lers internal CTF has not started yet.
                </h1>
            </div>
        </div>
    )
}
