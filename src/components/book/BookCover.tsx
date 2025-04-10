"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart } from 'lucide-react'
import type { Book } from "@/types"

interface BookCoverProps {
    book: Book
    isInWishlist: boolean
    onWishlistToggle: () => void
}

export default function BookCover({ book, isInWishlist, onWishlistToggle }: BookCoverProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    // Get cover image URL from formats
    const getCoverImage = () => {
        const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

        for (const type of imageTypes) {
            if (book.formats[type]) {
                return book.formats[type]
            }
        }

        return "/placeholder.svg?height=600&width=400"
    }

    return (
        <div className="w-full md:w-1/3">
            <div className="relative h-[450px] w-full rounded-md overflow-hidden shadow-sm book-shadow book-cover animate-fade-in">
                <Image
                    src={getCoverImage() || "/placeholder.svg"}
                    alt={`Cover for ${book.title}`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            <div className="mt-6 space-y-4">
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onWishlistToggle()
                    }}
                    className={`w-full inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${isInWishlist
                        ? "bg-primary text-white hover:bg-primary/90 border-primary"
                        : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? "fill-red-700" : ""}`} />
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
            </div>
        </div>
    )
}