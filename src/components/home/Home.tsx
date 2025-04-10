
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useBooks } from "@/hooks/useBooks"
import SearchBar from "./SearchBar"
import FilterDropdown from "./FilterDropdown"
import BookGrid from "./book/BookGrid"
import Pagination from "./Pagination"
import EmptyState from "./book/EmptyState"
import LanguageFilter from "./LanguageFilter"
import BookCardSkeleton from "./book/BookCardSkeleton"

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("")
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [authorYearRange, setAuthorYearRange] = useState<[number | null, number | null]>([null, null])

    const { isLoading, books, totalCount, totalPages, genres } = useBooks({
        page: currentPage,
        search: searchTerm,
        topic: selectedGenre,
        languages: selectedLanguages,
        author_year_start: authorYearRange[0] || undefined,
        author_year_end: authorYearRange[1] || undefined
    })

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleClearFilters = () => {
        setSearchTerm("")
        setSelectedGenre("")
        setSelectedLanguages([])
        setAuthorYearRange([null, null])
        setCurrentPage(1)
    }

    const hasFilters = searchTerm || selectedGenre || selectedLanguages.length > 0 || authorYearRange.some(Boolean)
    const showEmptyState = !isLoading && books.length === 0

    return (
        <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6">
            {/* Header section */}
            <div className="mb-12 max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-4">
                    Discover Literary Classics
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Explore thousands of timeless books from the world&apos;s greatest authors.
                </p>
            </div>

            {/* Filters section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="md:col-span-2">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>
                <FilterDropdown
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onGenreChange={setSelectedGenre}
                />
                <LanguageFilter
                    selectedLanguages={selectedLanguages}
                    onLanguageChange={setSelectedLanguages}
                />
            </div>

            {/* Results section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                        {hasFilters ? "Search Results" : "Popular Books"}
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {isLoading ? "Loading..." : `${totalCount} ${totalCount === 1 ? "book" : "books"} found`}
                    </span>
                </div>

                {isLoading ? (
                    <BookCardSkeleton />
                ) : showEmptyState ? (
                    <EmptyState
                        icon={Search}
                        title="No books found"
                        description="Try adjusting your search or filter settings."
                        actionLabel="Clear Filters"
                        actionOnClick={handleClearFilters}
                    />
                ) : (
                    <>
                        <BookGrid books={books} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    )
}
// "use client"

// import { useState } from "react"
// import { Search } from "lucide-react"
// import useSearchFilter from "@/hooks/useSearchFilter"
// import { useBooks } from "@/hooks/useBooks"
// import SearchBar from "./SearchBar"
// import FilterDropdown from "./FilterDropdown"
// import BookGrid from "./book/BookGrid"
// import Pagination from "./Pagination"
// import EmptyState from "./book/EmptyState"
// import BookCardSkeleton from "./book/BookCardSkeleton"

// export default function Home() {
//     const [currentPage, setCurrentPage] = useState(1)
//     const { searchTerm, setSearchTerm, selectedGenre, setSelectedGenre } = useSearchFilter()

//     // Use API search and filtering
//     const { isLoading, books, totalPages, genres, totalCount } = useBooks(
//         currentPage,
//         searchTerm,
//         selectedGenre
//     )

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page)
//         window.scrollTo({ top: 0, behavior: "smooth" })
//     }

//     const handleClearFilters = () => {
//         setSearchTerm("")
//         setSelectedGenre("")
//         setCurrentPage(1)
//     }

//     const showFilteredResults = searchTerm || selectedGenre
//     const showEmptyState = !isLoading && books.length === 0

//     return (
//         <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6">
//             {/* Header section */}
//             <div className="mb-12 max-w-3xl mx-auto text-center">
//                 <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-4">
//                     Discover Literary Classics
//                 </h1>
//                 <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
//                     Explore thousands of timeless books from the world&apos;s greatest authors.
//                 </p>

//                 <div className="flex flex-col md:flex-row gap-4 justify-center">
//                     <SearchBar
//                         searchTerm={searchTerm}
//                         onSearchChange={setSearchTerm}
//                     />
//                     <FilterDropdown
//                         genres={genres}
//                         selectedGenre={selectedGenre}
//                         onGenreChange={setSelectedGenre}
//                     />
//                 </div>
//             </div>

//             {/* Results section */}
//             <div className="mb-8">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-medium text-gray-900 dark:text-white">
//                         {showFilteredResults ? "Search Results" : "Popular Books"}
//                     </h2>
//                     {showFilteredResults && (
//                         <span className="text-sm text-gray-600 dark:text-gray-400">
//                             {totalCount} {totalCount === 1 ? "book" : "books"} found
//                         </span>
//                     )}
//                 </div>

//                 {isLoading ? (
//                     <BookCardSkeleton />
//                 ) : showEmptyState ? (
//                     <EmptyState
//                         icon={Search}
//                         title="No books found"
//                         description="Try adjusting your search or filter settings."
//                         actionLabel="Clear Filters"
//                         actionOnClick={handleClearFilters}
//                     />
//                 ) : (
//                     <>
//                         <BookGrid books={books} />
//                         {totalPages > 1 && (
//                             <Pagination
//                                 currentPage={currentPage}
//                                 totalPages={totalPages}
//                                 onPageChange={handlePageChange}
//                             />
//                         )}
//                     </>
//                 )}
//             </div>
//         </main>
//     )
// }