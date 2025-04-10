"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen } from "lucide-react"
import { useGet } from "@/hooks/useGet"
import type { Book } from "@/types"
import DownloadLinks from "./DownloadLinks"
import BookInfo from "./BookInfo"
import BookCover from "./BookCover"
import EmptyState from "../home/book/EmptyState"
import { useWishlist } from "@/context/WishlistContext" // Updated import
import { toast } from "react-toastify"

export default function BookDetail() {
    const params = useParams()
    const router = useRouter()
    const bookId = params.id as string
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist() // Now using context

    const {
        data: book,
        isLoading,
        error
    } = useGet<Book>(
        `https://gutendex.com/books/${bookId}`,
        ["book", bookId]
    )

    const handleWishlistToggle = () => {
        if (!book) return

        try {
            if (isInWishlist(book.id)) {
                removeFromWishlist(book.id)
                toast.success("Removed from wishlist")
            } else {
                addToWishlist(book)
                toast.success("Added to wishlist")
            }
        } catch (err) {
            console.error("Wishlist error:", err)
            toast.error("Failed to update wishlist")
        }
    }

    if (isLoading) {
        return (
            <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6">
                <div className="animate-pulse space-y-8">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error || !book) {
        return (
            <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6">
                <EmptyState
                    icon={BookOpen}
                    title="Book not found"
                    description={error?.message || "The book you're looking for doesn't exist"}
                    actionLabel="Go Back"
                    actionOnClick={() => router.back()}
                />
            </main>
        )
    }

    return (
        <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Books
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <BookCover
                    book={book}
                    isInWishlist={isInWishlist(book.id)}
                    onWishlistToggle={handleWishlistToggle}
                />
                <BookInfo book={book} />
            </div>

            <div className="mt-6 md:w-1/3">
                <DownloadLinks book={book} />
            </div>
        </main>
    )
}