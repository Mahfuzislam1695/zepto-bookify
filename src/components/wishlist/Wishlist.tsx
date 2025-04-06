"use client"

import { useWishlist } from "@/hooks/useWishlist";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookGrid from "../home/book/BookGrid";
import EmptyState from "../home/book/EmptyState";


const Wishlist = () => {
    const { wishlist } = useWishlist()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <main className="container mx-auto py-8">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Books
                </Link>

                <h1 className="text-3xl font-serif font-medium text-gray-900 dark:text-white mt-4 mb-2">Your Wishlist</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {wishlist.length > 0
                        ? `You have ${wishlist.length} book${wishlist.length > 1 ? "s" : ""} saved to your wishlist.`
                        : "Your wishlist is empty. Start adding books you love!"}
                </p>
            </div>

            {wishlist.length > 0 ? (
                <BookGrid books={wishlist} />
            ) : (
                <EmptyState
                    icon={Heart}
                    title="Your wishlist is empty"
                    description="Add books to your wishlist by clicking the heart icon on any book card"
                    actionLabel="Explore Books"
                    actionHref="/"
                />
            )}
        </main>
    );
};

export default Wishlist;