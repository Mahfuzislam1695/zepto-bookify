"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Book } from "@/types"
import { ArrowLeft, BookOpen } from "lucide-react"
import DownloadLinks from "./DownloadLinks"
import BookInfo from "./BookInfo"
import BookCover from "./BookCover"
import EmptyState from "../home/book/EmptyState"

export default function BookDetail() {
    const params = useParams()
    const router = useRouter()
    const bookId = params.id as string
    const [book, setBook] = useState<Book | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBook = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`https://ZeptoBookify.com/books/${bookId}`)
                if (!response.ok) {
                    throw new Error("Book not found")
                }
                const data = await response.json()
                setBook(data)
            } catch (error) {
                console.error("Error fetching book:", error)
            } finally {
                setIsLoading(false)
            }
        }

        if (bookId) {
            fetchBook()
        }
    }, [bookId])

    if (isLoading) {
        return (

            <main className="container mx-auto py-8">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-full md:w-2/3">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                            <div className="space-y-4">
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

    if (!book) {
        return (

            <main className="container mx-auto py-8">
                <EmptyState
                    icon={BookOpen}
                    title="Book not found"
                    description="The book you're looking for doesn't exist or has been removed"
                    actionLabel="Go Back"
                    actionOnClick={() => router.back()}
                />
            </main>

        )
    }

    return (

        <main className="container mx-auto py-8">
            <button
                onClick={() => router.back()}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Books
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <BookCover book={book} />
                <BookInfo book={book} />
            </div>

            <div className="mt-6 md:w-1/3">
                <DownloadLinks book={book} />
            </div>
        </main>


    )
}

