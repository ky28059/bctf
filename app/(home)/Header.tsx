import Timer from '@/app/(home)/Timer';


export default function Header() {
    return (
        <header className="pt-36 container flex flex-col items-center h-screen">
            <img src="/assets/logo.svg" />
            <Timer />
            <p>todo</p>
        </header>
    )
}
