"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Book } from "@/types"

type WishlistContextType = {
    wishlist: Book[]
    isInWishlist: (bookId: number) => boolean
    addToWishlist: (book: Book) => void
    removeFromWishlist: (bookId: number) => void
    isLoaded: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Book[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

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

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                isLoaded
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider")
    }
    return context
}