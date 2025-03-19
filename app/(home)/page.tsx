import Header from '@/app/(home)/Header';
import Sponsors from '@/app/(home)/Sponsors';
import Rules from '@/app/(home)/Rules';
import Prizes from '@/app/(home)/Prizes';


export default async function Home() {
    // backdrop-blur is slow on FF
    const maybeBlur = navigator.userAgent.search("Firefox") ? "" : "backdrop-blur-sm";
    return (
        <main className="pb-14 relative">
            <Header />

            <div className={`bg-black/40 py-16 mb-12 border-t border-tertiary ${maybeBlur}`} >
                <div className="px-6 sm:container">
                    <Rules />
                    <Prizes />
                </div>
            </div>

            {/* <Sponsors /> */}
        </main>
    )
}
