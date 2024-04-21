import { IoMdCloseCircle } from 'react-icons/io';


export default function NotFound() {
    return (
        <div className="flex gap-3 h-screen items-center justify-center">
            <IoMdCloseCircle className="text-5xl text-theme-bright" />

            <div>
                <h1 className="text-4xl font-bold">404.</h1>
                <p className="text-primary">
                    The requested profile was not found.
                </p>
            </div>
        </div>
    )
}
