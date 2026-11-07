import { Footer } from '@/components/map/layout/Footer';
import { Navbar } from '@/components/map/layout/Navbar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
