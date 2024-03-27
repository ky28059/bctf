import Header from '@/app/(home)/Header';
import Sponsors from '@/app/(home)/Sponsors';
import Rules from '@/app/(home)/Rules';
import Prizes from '@/app/(home)/Prizes';


export default function Home() {
    return (
        <main className="pb-14 relative">
            <Header />

            <div className="bg-black/30 py-16 mb-12 backdrop-blur-sm">
                <div className="container">
                    <Rules />
                    <Prizes />
                </div>
            </div>

            <Sponsors />
        </main>
    )
}
