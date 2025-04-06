"use client"

import { useEffect, useState } from "react"
import type { Book, BooksResponse } from "@/types"
import useSearchFilter from "@/hooks/useSearchFilter"
import SearchBar from "./SearchBar"
import FilterDropdown from "./FilterDropdown"
import BookGrid from "./book/BookGrid"
import Pagination from "./Pagination"
import EmptyState from "./book/EmptyState"
import { Search } from "lucide-react"
import { BOOKS_PER_PAGE } from "@/utils/constants"

export default function Home() {
    const [books, setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
    const [genres, setGenres] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const { searchTerm, setSearchTerm, selectedGenre, setSelectedGenre } = useSearchFilter()


    // Fetch books from API
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`https://gutendex.com/books?page=${currentPage}`)
                const data: BooksResponse = await response.json()
                setBooks(data.results)

                // Calculate total pages
                setTotalPages(Math.ceil(data.count / BOOKS_PER_PAGE))

                // Extract unique genres from books
                const allGenres = new Set<string>()
                data.results.forEach((book) => {
                    book.subjects.forEach((subject) => allGenres.add(subject))
                    book.bookshelves.forEach((bookshelf) => allGenres.add(bookshelf))
                })
                setGenres(Array.from(allGenres).sort())
            } catch (error) {
                console.error("Error fetching books:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBooks()
    }, [currentPage])

    // Filter books based on search term and selected genre
    useEffect(() => {
        let filtered = [...books]

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        // Filter by genre
        if (selectedGenre) {
            filtered = filtered.filter(
                (book) => book.subjects.includes(selectedGenre) || book.bookshelves.includes(selectedGenre),
            )
        }

        setFilteredBooks(filtered)
    }, [books, searchTerm, selectedGenre])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top when changing page
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleClearFilters = () => {
        setSearchTerm("")
        setSelectedGenre("")
    }

    return (

        <main className="container mx-auto py-8">
            {/* Header section */}
            <div className="mb-12 max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-4 animate-fade-in">
                    Discover Literary Classics
                </h1>
                <p className="text-lg font-sans text-gray-600 dark:text-gray-400 mb-8 animate-fade-in">
                    Explore thousands of timeless books from the world&apos;s greatest authors.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide-up">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <FilterDropdown genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
                </div>
            </div>

            {/* Results section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif font-medium text-gray-900 dark:text-white">
                        {searchTerm || selectedGenre ? "Search Results" : "Popular Books"}
                    </h2>
                    {(searchTerm || selectedGenre) && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">Found {filteredBooks.length} books</div>
                    )}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-md shadow-sm overflow-hidden h-80 animate-pulse"
                            >
                                <div className="h-56 bg-gray-200 dark:bg-gray-800"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <>
                        <BookGrid books={filteredBooks} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                ) : (
                    <EmptyState
                        icon={Search}
                        title="No books found"
                        description="We couldn't find any books matching your criteria. Try adjusting your search or filter settings."
                        actionLabel="Clear Filters"
                        actionOnClick={handleClearFilters}
                    />
                )}
            </div>
        </main>

    )
}