"use client"

import { useEffect, useState } from "react"
import type { Book } from "@/types"

export function useWishlist() {
    const [wishlist, setWishlist] = useState<Book[]>([])

    useEffect(() => {
        // Load wishlist from localStorage on component mount
        const savedWishlist = localStorage.getItem("wishlist")
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist))
            } catch (error) {
                console.error("Failed to parse wishlist:", error)
                localStorage.removeItem("wishlist")
            }
        }
    }, [])

    const addToWishlist = (book: Book) => {
        const newWishlist = [...wishlist, book]
        setWishlist(newWishlist)
        localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    }

    const removeFromWishlist = (bookId: number) => {
        const newWishlist = wishlist.filter((book) => book.id !== bookId)
        setWishlist(newWishlist)
        localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    }

    const isInWishlist = (bookId: number) => {
        return wishlist.some((book) => book.id === bookId)
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    }
}

