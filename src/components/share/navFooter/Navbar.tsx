"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Heart, Sun, Moon, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
    const pathname = usePathname()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle dark mode toggle
    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true"
        setIsDarkMode(isDark)
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleDarkMode = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)
        localStorage.setItem("darkMode", String(newMode))

        if (newMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center group">
                            <BookOpen className="h-6 w-6 text-primary mr-2 transition-transform duration-300 group-hover:scale-105" />
                            <span className="text-xl font-sans font-medium text-primary">ZeptoBookify</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname === "/"
                                ? "text-primary border-b-2 border-primary"
                                : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/wishlist"
                            className={`px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200 ${pathname === "/wishlist"
                                ? "text-primary border-b-2 border-primary"
                                : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                }`}
                        >
                            <Heart className="h-4 w-4 mr-1.5" />
                            Wishlist
                        </Link>
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300"
                            aria-label="Open menu"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 mt-2 animate-fade-in">
                    <div className="container mx-auto px-4 py-3 space-y-2">
                        <Link
                            href="/"
                            className={`block px-3 py-2 text-sm font-medium rounded-md ${pathname === "/"
                                ? "text-primary bg-gray-100 dark:bg-gray-800"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/wishlist"
                            className={`block px-3 py-2 text-sm font-medium rounded-md flex items-center ${pathname === "/wishlist"
                                ? "text-primary bg-gray-100 dark:bg-gray-800"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Wishlist
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

