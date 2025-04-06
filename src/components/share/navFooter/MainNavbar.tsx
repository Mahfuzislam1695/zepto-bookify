import Link from 'next/link'

export default function MainNavbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container content-center flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-primary">ZeptoBookify</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link
                        href="#features"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        href="#contact"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    )
}
