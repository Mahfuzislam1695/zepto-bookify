"use client"

import type { Book } from "@/types"
import { useEffect, useState } from "react"
import BookCard from "./BookCard"

interface BookGridProps {
    books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-grid">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}