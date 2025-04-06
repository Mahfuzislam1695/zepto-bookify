import Footer from "@/components/share/navFooter/Footer";
import Navbar from "@/components/share/navFooter/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="min-h-screen bg-background text-foreground paper-texture">
                <Navbar />
                <div>{children}</div>
                <Footer />
            </div>
        </section>
    );
}