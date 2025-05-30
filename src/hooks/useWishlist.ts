"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/types"

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState<Book[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist))
            } catch (error) {
                console.error("Failed to parse wishlist", error)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
        }
    }, [wishlist, isLoaded])

    const isInWishlist = (bookId: number) => {
        return wishlist.some(book => book.id === bookId)
    }

    const addToWishlist = (book: Book) => {
        setWishlist(prev => [...prev, book])
    }

    const removeFromWishlist = (bookId: number) => {
        setWishlist(prev => prev.filter(book => book.id !== bookId))
    }

    return {
        wishlist,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        isLoaded
    }
}