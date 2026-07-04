import Header from '@/app/(home)/Header';
import Rules from '@/app/(home)/Rules';


export default async function Home() {
    return (
        <main className="pb-14 relative">
            <Header />

            <div className="bg-gradient-to-b from-black/40 via-black/30 to-transparent py-16 mb-12 border-t border-tertiary">
                <div className="px-6 sm:container">
                    <Rules />
                </div>
            </div>
        </main>
    )
}
