import MainNavbar from "@/components/share/navFooter/MainNavbar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-background text-primary content-center">
            <MainNavbar />
            <div>{children}</div>
        </section>
    );
}