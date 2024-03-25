import Timer from '@/app/(home)/Timer';
import Sponsors from '@/app/(home)/Sponsors';
import Rules from '@/app/(home)/Rules';


export default function Home() {
    return (
        <main className="pt-36 pb-14">
            <div className="container mb-20 flex flex-col items-center">
                <img src="/assets/logo.svg" />
                <Timer />
                <p className="">todo</p>
            </div>

            <div className="bg-black/30 py-12 mb-12">
                <div className="container">
                    <Rules />
                </div>
            </div>

            <Sponsors/>
        </main>
    )
}
