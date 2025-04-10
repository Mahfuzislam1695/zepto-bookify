"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, BookOpen } from "lucide-react"
import type { Book } from "@/types"
import { useWishlist } from "@/context/WishlistContext"

interface BookCardProps {
    book: Book
}

export default function BookCard({ book }: BookCardProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const [isLoading, setIsLoading] = useState(true)
    const [isWishlistProcessing, setIsWishlistProcessing] = useState(false)

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

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setIsWishlistProcessing(true)
        try {
            if (isInWishlist(book.id)) {
                removeFromWishlist(book.id)
            } else {
                addToWishlist(book)
            }
        } finally {
            setIsWishlistProcessing(false)
        }
    }

    return (
        <Link href={`/book/${book.id}`} className="block h-full group">
            <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={getCoverImage()}
                        alt={`Cover for ${book.title}`}
                        width={200}
                        height={300}
                        priority
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                            }`}
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
                        disabled={isWishlistProcessing}
                        className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-all cursor-pointer duration-200 ${isInWishlist(book.id)
                            ? "bg-red-100 dark:bg-red-900/80 text-red-600 dark:text-red-300"
                            : "bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                        aria-label={
                            isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"
                        }
                    >
                        <Heart
                            className={`h-5 w-5 transition-all ${isInWishlist(book.id)
                                ? "fill-red-500 dark:fill-red-400 scale-110"
                                : "group-hover:fill-red-300 dark:group-hover:fill-red-500/30"
                                }`}
                        />
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {book.authors.length > 0
                            ? book.authors.map((author) => author.name).join(", ")
                            : "Unknown Author"}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-800 dark:text-gray-200">
                            {book.subjects?.[0] || book.bookshelves?.[0] || "Unknown Genre"}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <BookOpen className="h-3 w-3 mr-1" />
                            <span>#{book.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
