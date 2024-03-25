import Timer from '@/app/(home)/Timer';
import Sponsors from '@/app/(home)/Sponsors';


export default function Home() {
    return (
        <main className="container pt-36 pb-14 flex flex-col items-center">
            <img src="/assets/logo.svg" />
            <Timer />
            <p className="mb-20">todo</p>

            <Sponsors />
        </main>
    )
}
