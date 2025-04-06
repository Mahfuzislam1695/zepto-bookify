"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, BookOpen } from "lucide-react"
import type { Book } from "@/types"
import { useState } from "react"
import { useWishlist } from "@/hooks/useWishlist"

interface BookCardProps {
    book: Book
    index?: number
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const [isLoading, setIsLoading] = useState(true)

    // Get cover image URL from formats
    const getCoverImage = () => {
        const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

        for (const type of imageTypes) {
            if (book.formats[type]) {
                return book.formats[type]
            }
        }

        return "/placeholder.svg?height=300&width=200"
    }

    const coverImage = getCoverImage()

    // Get primary genre/topic
    const getPrimaryGenre = () => {
        if (book.subjects && book.subjects.length > 0) {
            return book.subjects[0]
        }
        if (book.bookshelves && book.bookshelves.length > 0) {
            return book.bookshelves[0]
        }
        return "Unknown Genre"
    }

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isInWishlist(book.id)) {
            removeFromWishlist(book.id)
        } else {
            addToWishlist(book)
        }
    }

    // Calculate animation delay based on index
    const getAnimationDelay = () => {
        return `${0.05 + index * 0.05}s`
    }

    return (
        <Link href={`/book/${book.id}`} className="block h-full">
            <div
                className="bg-white dark:bg-gray-900 rounded-md overflow-hidden h-full book-shadow hover-lift book-spine"
                style={{ animationDelay: getAnimationDelay() }}
            >
                <div className="relative h-56 w-full overflow-hidden book-cover">
                    {/* <Image
                        src={coverImage || "/placeholder.svg"}
                        alt={`Cover for ${book.title}`}
                        width={200}
                        height={300}
                        fill
                        className={`object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                        onLoad={() => setIsLoading(false)}
                    /> */}
                    <Image
                        src={coverImage || "/placeholder.svg"}
                        alt={`Cover for ${book.title}`}
                        width={200}
                        height={300}
                        priority // For important above-the-fold images
                        className={`object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                        onLoad={() => setIsLoading(false)}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Wishlist button */}
                    <button
                        onClick={handleWishlistToggle}
                        className={`absolute top-2 right-2 p-1.5 rounded-full z-10 transition-colors duration-200 ${isInWishlist(book.id)
                            ? "bg-primary text-white"
                            : "bg-white/90 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-300"
                            }`}
                        aria-label={isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart
                            className={`h-4 w-4 transition-colors duration-200 ${isInWishlist(book.id) ? "fill-current" : ""}`}
                        />
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="book-title text-base font-sans font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {book.title}
                    </h3>
                    <p className="book-author text-sm font-sans text-gray-600 dark:text-gray-400 line-clamp-1">
                        {book.authors.length > 0 ? book.authors.map((author) => author.name).join(", ") : "Unknown Author"}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="px-2 py-0.5 bg-secondary text-xs rounded-sm text-primary text-opacity-90 font-medium">
                            {getPrimaryGenre()}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen className="h-3 w-3 mr-1" />
                            <span>{book.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

