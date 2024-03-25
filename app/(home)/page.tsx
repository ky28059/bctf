import Header from '@/app/(home)/Header';
import Sponsors from '@/app/(home)/Sponsors';
import Rules from '@/app/(home)/Rules';


export default function Home() {
    return (
        <main className="pb-14">
            <Header />

            <div className="bg-black/30 py-12 mb-12">
                <div className="container">
                    <Rules />
                </div>
            </div>

            <Sponsors />
        </main>
    )
}
